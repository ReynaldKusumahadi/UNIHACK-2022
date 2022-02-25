// const Libp2p = require('libp2p')
// const TCP = require('libp2p-tcp')
// const {NOISE} = require("libp2p-noise")
// const MPLEX = require('libp2p-mplex')
// const process= require('process')
// const {multiaddr} = require("multiaddr");
//
// const main = async () => {
//   const node = await Libp2p.create({
//     addresses: {
//       // add a listen address (localhost) to accept TCP connections on a random port
//       listen: ['/ip4/127.0.0.1/tcp/0']
//     },
//     modules: {
//       transport: [TCP],
//       connEncryption: [NOISE],
//       streamMuxer: [MPLEX]
//     }
//   })
//
// // start libp2p
//   await node.start()
//   console.log('libp2p has started')
//
// // print out listening addresses
//   console.log('listening on addresses:')
//   node.multiaddrs.forEach(addr => {
//     console.log(`${addr.toString()}/p2p/${node.peerId.toB58String()}`)
//   })
//
// // ping peer if received multiaddr
//   if (process.argv.length >= 3) {
//     const ma = multiaddr(process.argv[2])
//     console.log(`pinging remote peer at ${process.argv[2]}`)
//     const latency = await node.ping(ma)
//     console.log(`pinged ${process.argv[2]} in ${latency}ms`)
//   } else {
//     console.log('no remote peer address given, skipping ping')
//   }
//
//   const stop = async () => {
//     // stop libp2p
//     await node.stop()
//     console.log('libp2p has stopped')
//     process.exit(0)
//   }
//
//   process.on('SIGTERM', stop)
//   process.on('SIGINT', stop)
//
// }
//
// main()




/* eslint-disable no-console */
// 'use strict'
//
// const Libp2p = require('libp2p')
// const TCP = require('libp2p-tcp')
// const Mplex = require('libp2p-mplex')
// const { NOISE } = require('libp2p-noise')
// const Gossipsub = require('libp2p-gossipsub')
// const { fromString: uint8ArrayFromString } = require('uint8arrays/from-string')
// const { toString: uint8ArrayToString } = require('uint8arrays/to-string')
//
// const createNode = async () => {
//       const node = await Libp2p.create({
//         addresses: {
//           listen: ['/ip4/0.0.0.0/tcp/0']
//         },
//         modules: {
//           transport: [TCP],
//           streamMuxer: [Mplex],
//           connEncryption: [NOISE],
//           pubsub: Gossipsub
//         }
//       })
//
//       await node.start()
//       return node
//     }
//
// ;(async () => {
//   const topic = 'news'
//
//   const [node1, node2] = await Promise.all([
//     createNode(),
//     createNode()
//   ])
//
//   // Add node's 2 data to the PeerStore
//   await node1.peerStore.addressBook.set(node2.peerId, node2.multiaddrs)
//   await node1.dial(node2.peerId)
//
//   node1.pubsub.on(topic, (msg) => {
//     console.log(`node1 received: ${uint8ArrayToString(msg.data)}`)
//   })
//   node1.pubsub.subscribe(topic)
//
//   // Will not receive own published messages by default
//   node2.pubsub.on(topic, (msg) => {
//     console.log(`node2 received: ${uint8ArrayToString(msg.data)}`)
//   })
//   node2.pubsub.subscribe(topic)
//
//   // node2 publishes "news" every second
//   setInterval(() => {
//     node2.pubsub.publish(topic, uint8ArrayFromString('Bird bird bird, bird is the word!'))
//   }, 1000)
// })()




/* eslint-disable no-console */
'use strict'

const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const Mplex = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')
const Gossipsub = require('libp2p-gossipsub')
const Bootstrap = require('libp2p-bootstrap')
const PubsubPeerDiscovery = require('libp2p-pubsub-peer-discovery')

const createRelayServer = require('libp2p-relay-server')

const createNode = async (bootstrapers) => {
        const node = await Libp2p.create({
            addresses: {
                listen: ['/ip4/0.0.0.0/tcp/0']
            },
            modules: {
                transport: [TCP],
                streamMuxer: [Mplex],
                connEncryption: [NOISE],
                pubsub: Gossipsub,
                peerDiscovery: [Bootstrap, PubsubPeerDiscovery]
            },
            config: {
                peerDiscovery: {
                    [PubsubPeerDiscovery.tag]: {
                        interval: 1000,
                        enabled: true
                    },
                    [Bootstrap.tag]: {
                        enabled: true,
                        list: bootstrapers
                    }
                }
            }
        })

        return node
    }

;(async () => {
    const relay = await createRelayServer({
        listenAddresses: ['/ip4/0.0.0.0/tcp/0']
    })
    console.log(`libp2p relay starting with id: ${relay.peerId.toB58String()}`)
    await relay.start()
    const relayMultiaddrs = relay.multiaddrs.map((m) => `${m.toString()}/p2p/${relay.peerId.toB58String()}`)

    const [node1, node2] = await Promise.all([
        createNode(relayMultiaddrs),
        createNode(relayMultiaddrs)
    ])

    node1.on('peer:discovery', (peerId) => {
        console.log(`Peer ${node1.peerId.toB58String()} discovered: ${peerId.toB58String()}`)
    })
    node2.on('peer:discovery', (peerId) => {
        console.log(`Peer ${node2.peerId.toB58String()} discovered: ${peerId.toB58String()}`)
    })

    ;[node1, node2].forEach((node, index) => console.log(`Node ${index} starting with id: ${node.peerId.toB58String()}`))
    await Promise.all([
        node1.start(),
        node2.start()
    ])
})();
