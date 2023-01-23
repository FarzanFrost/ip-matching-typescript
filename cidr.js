"use strict";
exports.__esModule = true;
var ip_matching_1 = require("ip-matching");
console.log("Hello World");
var print = function (x) { console.log(x); };
print((0, ip_matching_1.matches)('10.0.0.1', '10.0.0.0/24'));
print((0, ip_matching_1.matches)('10.0.1.1', '10.0.0.0/24'));
// This can match between two ip address, not just between ip and subnet.
print((0, ip_matching_1.matches)('10.0.0.1', '10.0.0.1'));
print((0, ip_matching_1.matches)('10.0.0.1', '10.0.0.0'));
// This throws new error 'The given value is not a valid IP, this means it.
// Cannot compare between two subnets.
// Print(matches('10.0.0.1/24', '10.0.0.0/16'))
// Here it returns as object of IPv4.
var ipv4Address = (0, ip_matching_1.getMatch)('10.0.0.0');
print('\n');
print(ipv4Address);
// Here it returns an object of IPSubnetwork.
var mySubnet = (0, ip_matching_1.getMatch)('10.0.0.0/24');
print(mySubnet);
print(mySubnet.type); // IPSbnetwork.
print(mySubnet instanceof ip_matching_1.IPSubnetwork); // True.
print(mySubnet instanceof ip_matching_1.IPMatch); // True.
print(mySubnet.toString()); // Returns my input to getMatch().
print(mySubnet.matches('10.0.0.1')); // True.
print(mySubnet.matches('10.0.1.1')); // False.
// This throws new error 'The given value is not a valid IP', this means it.
// Cannot compare between two subnets.
// Print(mySubnet.matches('10.0.0.1/24'))
print(mySubnet.equals(new ip_matching_1.IPSubnetwork(new ip_matching_1.IPv4('10.0.0.0'), 24))); // True.
print(mySubnet.equals(new ip_matching_1.IPSubnetwork(new ip_matching_1.IPv4('10.0.0.1'), 24))); // True.
print(mySubnet.equals(new ip_matching_1.IPSubnetwork(new ip_matching_1.IPv4('10.0.1.0'), 24))); // False.
print(mySubnet.equals(new ip_matching_1.IPSubnetwork(new ip_matching_1.IPv4('10.0.1.1'), 24))); // False.
print(mySubnet.equals(new ip_matching_1.IPSubnetwork(new ip_matching_1.IPv4('10.0.0.0'), 16))); // False.
// The below results show it only checks if the subnet exactly matches.
// It dose not check for subnets within the network.
print(mySubnet.equals(new ip_matching_1.IPSubnetwork(new ip_matching_1.IPv4('10.0.0.0'), 25))); // False.
print(mySubnet.equals(new ip_matching_1.IPSubnetwork(new ip_matching_1.IPv4('10.0.0.1'), 25))); // False.
// The number of devices in a network.
print(mySubnet.getAmount());
print(mySubnet.getLast().toString());
print("checking range");
// Returns an object of IPRange.
var myRange = (0, ip_matching_1.getMatch)('10.0.0.0-10.0.1.0');
print(myRange);
// The below code is invalid.
// const myRange1 = getMatch('10.0.0.0-10.0.1.0-10.0.2.0')
// print(myRange1)
// Returns an object of IPRange.
// There seem to have no difference with the myRange object above.
var myRange2 = (0, ip_matching_1.getMatch)('10.0.0.0-10.0.1.0');
print(myRange2);
print("converting to mask");
// Returns a list of IPMask objects.
print(myRange.convertToMasks());
print("converting to subnet");
print(myRange.convertToMasks().map(function (mask) { var _a; return (_a = mask.convertToSubnet()) === null || _a === void 0 ? void 0 : _a.toString(); }));
print("converting cidr to range");
// Here there is no differnece between myRange3 and mySubnet.
var myRange3 = (0, ip_matching_1.getMatch)('10.0.0.0/24');
print(myRange3);
print(mySubnet);
// Throws an error 'Left side of the IP range isn\'t a valid (exact) IP'.
// const myRange4 = getMatch('10.0.0.0/24-10.0.1.0/24') as IPRange
var mask1 = (0, ip_matching_1.getMatch)('10.0.0.0/255.255.0.0');
var mask2 = (0, ip_matching_1.getMatch)('10.0.0.0/255.255.255.0');
print('mask1');
print(mask1.isSubsetOf(mask2));
print(mask2.isSubsetOf(mask1));
var mask3 = (0, ip_matching_1.getMatch)('10.0.0.0/16');
var mask4 = (0, ip_matching_1.getMatch)('10.0.0.0/24');
print('mask3');
print(mask3.isSubsetOf(mask4));
print(mask4.isSubsetOf(mask3));
