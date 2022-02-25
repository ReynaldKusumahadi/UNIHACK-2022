// Connecting two nodes and pining them together

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




// Basic Pubsub

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
// var topicAddress = "TopicAddress1";
// var topicOwnerAddress = "TopicOwnerAddress1";
// var topicTitle = "TopicTitle1";
// var topicDescription = "TopicDescription1";
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
//
//     // Publish json data
//     var jsonData = {
//         "topicAddress": topicAddress,
//         "topicOwnerAddress": topicOwnerAddress,
//         "topicTitle": topicTitle,
//         "topicDescription": topicDescription
//     }
//
//     node2.pubsub.publish(topic, uint8ArrayFromString(JSON.stringify(jsonData)))
// })()
//


// PubSub based peer discovery

/* eslint-disable no-console */
// 'use strict'
//
// const Libp2p = require('libp2p')
// const TCP = require('libp2p-tcp')
// const Mplex = require('libp2p-mplex')
// const { NOISE } = require('libp2p-noise')
// const Gossipsub = require('libp2p-gossipsub')
// const Bootstrap = require('libp2p-bootstrap')
// const PubsubPeerDiscovery = require('libp2p-pubsub-peer-discovery')
//
// const createRelayServer = require('libp2p-relay-server')
//
// const createNode = async (bootstrapers) => {
//         const node = await Libp2p.create({
//             addresses: {
//                 listen: ['/ip4/0.0.0.0/tcp/0']
//             },
//             modules: {
//                 transport: [TCP],
//                 streamMuxer: [Mplex],
//                 connEncryption: [NOISE],
//                 pubsub: Gossipsub,
//                 peerDiscovery: [Bootstrap, PubsubPeerDiscovery]
//             },
//             config: {
//                 peerDiscovery: {
//                     [PubsubPeerDiscovery.tag]: {
//                         interval: 1000,
//                         enabled: true
//                     },
//                     [Bootstrap.tag]: {
//                         enabled: true,
//                         list: bootstrapers
//                     }
//                 }
//             }
//         })
//
//         return node
//     }
//
// ;(async () => {
//     const relay = await createRelayServer({
//         listenAddresses: ['/ip4/0.0.0.0/tcp/0']
//     })
//     console.log(`libp2p relay starting with id: ${relay.peerId.toB58String()}`)
//     await relay.start()
//     const relayMultiaddrs = relay.multiaddrs.map((m) => `${m.toString()}/p2p/${relay.peerId.toB58String()}`)
//
//     const [node1, node2] = await Promise.all([
//         createNode(relayMultiaddrs),
//         createNode(relayMultiaddrs)
//     ])
//
//     node1.on('peer:discovery', (peerId) => {
//         console.log(`Peer ${node1.peerId.toB58String()} discovered: ${peerId.toB58String()}`)
//     })
//     node2.on('peer:discovery', (peerId) => {
//         console.log(`Peer ${node2.peerId.toB58String()} discovered: ${peerId.toB58String()}`)
//     })
//
//     ;[node1, node2].forEach((node, index) => console.log(`Node ${index} starting with id: ${node.peerId.toB58String()}`))
//     await Promise.all([
//         node1.start(),
//         node2.start()
//     ])
// })();



// Web implementation (Using WebRTC) | Peer discovery based on WebRTC

// import 'babel-polyfill'
// import Libp2p from 'libp2p'
// import Websockets from 'libp2p-websockets'
// import WebRTCStar from 'libp2p-webrtc-star'
// import { NOISE } from 'libp2p-noise'
// import Mplex from 'libp2p-mplex'
// import Bootstrap from 'libp2p-bootstrap'
//
// document.addEventListener('DOMContentLoaded', async () => {
//
//     // Create our libp2p node
//     const libp2p = await Libp2p.create({
//         addresses: {
//             // Add the signaling server address, along with our PeerId to our multiaddrs list
//             // libp2p will automatically attempt to dial to the signaling server so that it can
//             // receive inbound connections from other peers
//             listen: [
//                 '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
//                 '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
//             ]
//         },
//         modules: {
//             transport: [Websockets, WebRTCStar],
//             connEncryption: [NOISE],
//             streamMuxer: [Mplex],
//             peerDiscovery: [Bootstrap]
//         },
//         config: {
//             peerDiscovery: {
//                 // The `tag` property will be searched when creating the instance of your Peer Discovery service.
//                 // The associated object, will be passed to the service when it is instantiated.
//                 [Bootstrap.tag]: {
//                     enabled: true,
//                     list: [
//                         '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
//                     ]
//                 }
//             }
//         }
//     })
//
//
//
//     // UI elements
//     const status = document.getElementById('status')
//     const output = document.getElementById('output')
//
//     output.textContent = ''
//
//     function log (txt) {
//         console.info(txt)
//         output.textContent += `${txt.trim()}\n`
//     }
//
//     // Listen for new peers
//     libp2p.on('peer:discovery', (peerId) => {
//         log(`Found peer ${peerId.toB58String()}`)
//     })
//
//     // Listen for new connections to peers
//     libp2p.connectionManager.on('peer:connect', (connection) => {
//         log(`Connected to ${connection.remotePeer.toB58String()}`)
//     })
//
//     // Listen for peers disconnecting
//     libp2p.connectionManager.on('peer:disconnect', (connection) => {
//         log(`Disconnected from ${connection.remotePeer.toB58String()}`)
//     })
//
//     await libp2p.start()
//     status.innerText = 'libp2p started!'
//     log(`libp2p id is ${libp2p.peerId.toB58String()}`)
//
//     // Export libp2p to the window so you can play with the API
//     window.libp2p = libp2p
// })


