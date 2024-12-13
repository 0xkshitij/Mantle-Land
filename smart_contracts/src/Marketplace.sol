// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IAutomationRegistrarInterface {
    // Mock methods to avoid abstract errors. Replace with actual methods if necessary.
    function dummyFunction() external;
}

contract Marketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        address tokenAddress;
        uint256 tokenId;
        uint256 price;
        bool isAuction;
        uint256 auctionEndTime;
        address highestBidder;
        uint256 highestBid;
        bool sold;
    }

    mapping(uint256 => Listing) public listings;
    uint256 public listingCounter;

    IAutomationRegistrarInterface public immutable registrar;
    IERC20 public immutable linkToken;

    event ListingCreated(
        uint256 indexed listingId,
        address indexed seller,
        address tokenAddress,
        uint256 tokenId,
        uint256 price,
        bool isAuction,
        uint256 auctionEndTime
    );

    event BidPlaced(
        uint256 indexed listingId,
        address indexed bidder,
        uint256 bidAmount
    );

    event ListingSold(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price
    );

    event AuctionFinalized(
        uint256 indexed listingId,
        address indexed winner,
        uint256 winningBid
    );

    constructor(address _registrar, address _linkToken) {
        registrar = IAutomationRegistrarInterface(_registrar);
        linkToken = IERC20(_linkToken);
    }

    modifier listingExists(uint256 listingId) {
        require(listingId < listingCounter, "Listing does not exist");
        _;
    }

    modifier onlySeller(uint256 listingId) {
        require(msg.sender == listings[listingId].seller, "Not the seller");
        _;
    }

    function createListing(
        address tokenAddress,
        uint256 tokenId,
        uint256 price,
        bool isAuction,
        uint256 auctionTime
    ) external {
        require(price > 0, "Price must be greater than zero");

        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenId);

        uint256 auctionEndTime = 0;
        if (isAuction) {
            require(auctionTime > 0, "Auction time must be greater than zero");
            auctionEndTime = block.timestamp + auctionTime;
        }

        listings[listingCounter] = Listing({
            seller: msg.sender,
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            price: price,
            isAuction: isAuction,
            auctionEndTime: auctionEndTime,
            highestBidder: address(0),
            highestBid: 0,
            sold: false
        });

        emit ListingCreated(
            listingCounter,
            msg.sender,
            tokenAddress,
            tokenId,
            price,
            isAuction,
            auctionEndTime
        );

        listingCounter++;
    }

    function buy(uint256 listingId) external payable listingExists(listingId) nonReentrant {
        Listing storage listing = listings[listingId];
        require(!listing.isAuction, "Cannot buy an auction");
        require(!listing.sold, "Listing already sold");
        require(msg.value == listing.price, "Incorrect price sent");

        listing.sold = true;
        payable(listing.seller).transfer(msg.value);
        IERC721(listing.tokenAddress).transferFrom(address(this), msg.sender, listing.tokenId);

        emit ListingSold(listingId, msg.sender, listing.price);
    }

    function placeBid(uint256 listingId) external payable listingExists(listingId) nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isAuction, "Not an auction");
        require(block.timestamp < listing.auctionEndTime, "Auction ended");
        require(msg.value > listing.highestBid, "Bid must be higher than current highest bid");

        if (listing.highestBid > 0) {
            payable(listing.highestBidder).transfer(listing.highestBid);
        }

        listing.highestBid = msg.value;
        listing.highestBidder = msg.sender;

        emit BidPlaced(listingId, msg.sender, msg.value);
    }

    function finalizeAuction(uint256 listingId) external listingExists(listingId) nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isAuction, "Not an auction");
        require(block.timestamp >= listing.auctionEndTime, "Auction not ended");
        require(!listing.sold, "Auction already finalized");

        listing.sold = true;
        if (listing.highestBid > 0) {
            payable(listing.seller).transfer(listing.highestBid);
            IERC721(listing.tokenAddress).transferFrom(
                address(this),
                listing.highestBidder,
                listing.tokenId
            );

            emit AuctionFinalized(listingId, listing.highestBidder, listing.highestBid);
        } else {
            IERC721(listing.tokenAddress).transferFrom(address(this), listing.seller, listing.tokenId);
        }
    }
}
