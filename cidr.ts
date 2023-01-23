import {getMatch, IPMatch, IPSubnetwork, IPRange, matches, IPv4, IPMask} from 'ip-matching'
console.log("Hello World")

const print = (x) => {console.log(x)}

print(matches('10.0.0.1', '10.0.0.0/24'))
print(matches('10.0.1.1', '10.0.0.0/24'))

// This can match between two ip address, not just between ip and subnet.
print(matches('10.0.0.1', '10.0.0.1'))
print(matches('10.0.0.1', '10.0.0.0'))

// This throws new error 'The given value is not a valid IP, this means it.
// Cannot compare between two subnets.
// Print(matches('10.0.0.1/24', '10.0.0.0/16'))

// Here it returns as object of IPv4.
const ipv4Address: IPMatch = getMatch('10.0.0.0')
print('\n')
print(ipv4Address)

// Here it returns an object of IPSubnetwork.
const mySubnet: IPMatch = getMatch('10.0.0.0/24')
print(mySubnet)

print(mySubnet.type) // IPSbnetwork.
print(mySubnet instanceof IPSubnetwork) // True.
print(mySubnet instanceof IPMatch) // True.
print(mySubnet.toString()) // Returns my input to getMatch().

print(mySubnet.matches('10.0.0.1')) // True.
print(mySubnet.matches('10.0.1.1')) // False.

// This throws new error 'The given value is not a valid IP', this means it.
// Cannot compare between two subnets.
// Print(mySubnet.matches('10.0.0.1/24'))


print(mySubnet.equals(new IPSubnetwork( new IPv4('10.0.0.0'), 24))) // True.
print(mySubnet.equals(new IPSubnetwork( new IPv4('10.0.0.1'), 24))) // True.
print(mySubnet.equals(new IPSubnetwork( new IPv4('10.0.1.0'), 24))) // False.
print(mySubnet.equals(new IPSubnetwork( new IPv4('10.0.1.1'), 24))) // False.
print(mySubnet.equals(new IPSubnetwork( new IPv4('10.0.0.0'), 16))) // False.

// The below results show it only checks if the subnet exactly matches.
// It dose not check for subnets within the network.
print(mySubnet.equals(new IPSubnetwork( new IPv4('10.0.0.0'), 25))) // False.
print(mySubnet.equals(new IPSubnetwork( new IPv4('10.0.0.1'), 25))) // False.

// The number of devices in a network.
print(mySubnet.getAmount())

print((mySubnet as IPSubnetwork).getLast().toString())

print("checking range")

// Returns an object of IPRange.
const myRange = getMatch('10.0.0.0-10.0.1.0')
print(myRange)

// The below code is invalid.
// const myRange1 = getMatch('10.0.0.0-10.0.1.0-10.0.2.0')
// print(myRange1)

// Returns an object of IPRange.
// There seem to have no difference with the myRange object above.
const myRange2 = getMatch('10.0.0.0-10.0.1.0') as IPRange
print(myRange2)

print("converting to mask")
// Returns a list of IPMask objects.
print(myRange.convertToMasks())

print("converting to subnet")
print(myRange.convertToMasks().map((mask:IPMask) => mask.convertToSubnet()?.toString()))

print("converting cidr to range")
// Here there is no differnece between myRange3 and mySubnet.
const myRange3 = getMatch('10.0.0.0/24') as IPRange
print(myRange3)
print(mySubnet)

// Throws an error 'Left side of the IP range isn\'t a valid (exact) IP'.
// const myRange4 = getMatch('10.0.0.0/24-10.0.1.0/24') as IPRange

const mask1 : IPMask = getMatch('10.0.0.0/255.255.0.0') as IPMask
const mask2 : IPMask = getMatch('10.0.0.0/255.255.255.0') as IPMask
print('mask1')
print(mask1.isSubsetOf(mask2))
print(mask2.isSubsetOf(mask1))

// In this case the string pattern of cidr is not supported.
// The getMatch method does not return an object of IPMask.
// const mask3 : IPMask = getMatch('10.0.0.0/16') as IPMask
// const mask4 : IPMask = getMatch('10.0.0.0/24') as IPMask
// print('mask3')
// print(mask3.isSubsetOf(mask4))
// print(mask4.isSubsetOf(mask3))