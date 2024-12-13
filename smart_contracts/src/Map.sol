// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

error ZeroSize();
error ZeroPerSize();
error SizeNotDivisibleByPerSize();
error InvalidXIndex();
error InvalidYIndex();
error LandAlreadyOwned();
error NotOwner();
error InvalidLength();

contract Map is ERC2771Context, ERC721 {
    struct Land {
        uint256 xIndex;
        uint256 yIndex;
    }

    uint256 public size;
    uint256 public perSize;
    uint256 public landCount;
    string public baseUri;
    address public utilsAddress;

    mapping(uint256 => mapping(uint256 => uint256)) public landIds;
    mapping(uint256 => Land) public land;
    mapping(uint256 => mapping(uint256 => uint256)) public map;

    constructor(
        uint256 _size,
        uint256 _perSize,
        string memory _baseUri,
        address _utilsAddress,
        address trustedForwarder
    ) ERC2771Context(trustedForwarder) ERC721("Map", "MAP") {
        if (_size == 0) revert ZeroSize();
        if (_perSize == 0) revert ZeroPerSize();
        if (_size % _perSize != 0) revert SizeNotDivisibleByPerSize();
        
        size = _size;
        perSize = _perSize;
        baseUri = _baseUri;
        utilsAddress = _utilsAddress;
    }

    function mint(uint256 xIndex, uint256 yIndex) public returns (uint256) {
        if (xIndex >= size / perSize || yIndex >= size / perSize) revert InvalidXIndex();
        if (landIds[xIndex][yIndex] != 0) revert LandAlreadyOwned();

        landCount++;
        landIds[xIndex][yIndex] = landCount;
        land[landCount] = Land(xIndex, yIndex);
        _mint(_msgSender(), landCount);
        return landCount;
    }

    function placeItem(uint256 x, uint256 y, uint256 utilId) public {
        uint256 landId = landIds[x / perSize][y / perSize];
        if (_msgSender() != ownerOf(landId)) revert NotOwner();
        
        IERC1155 utils = IERC1155(utilsAddress);
        uint256 currentUtilId = map[x][y];
        
        if (currentUtilId != 0) {
            utils.safeTransferFrom(address(this), _msgSender(), currentUtilId, 1, "");
        }
        
        utils.safeTransferFrom(_msgSender(), address(this), utilId, 1, "");
        map[x][y] = utilId;
    }

    function removeItem(uint256 x, uint256 y) public {
        uint256 landId = landIds[x / perSize][y / perSize];
        if (_msgSender() != ownerOf(landId)) revert NotOwner();

        uint256 currentUtilId = map[x][y];
        if (currentUtilId != 0) {
            IERC1155 utils = IERC1155(utilsAddress);
            utils.safeTransferFrom(address(this), _msgSender(), currentUtilId, 1, "");
            map[x][y] = 0;
        }
    }

    function updateItem(uint256 x, uint256 y, uint256 utilId) public {
        if (utilId == 0) {
            removeItem(x, y);
        } else {
            placeItem(x, y, utilId);
        }
    }

    function tokenURI(uint256 id) public view virtual override returns (string memory) {
        return string(abi.encodePacked(baseUri, uint2str(id)));
    }

    // Helper function to convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            bstr[--k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        
        return string(bstr);
    }

    function _msgSender() internal view virtual override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view virtual override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    // Overriding _contextSuffixLength to resolve conflict with Context and ERC2771Context
    function _contextSuffixLength() internal view virtual override(ERC2771Context, Context) returns (uint256) {
        return 20;  // Adjust the length if needed, 20 is the default for ERC2771Context
    }
}
