import {
  generateUUID,
} from '../../src/utils/index';

export default {
  nodeData: {
    id: generateUUID(),
    topic: 'First Map',
    root: true,
    children: [
      {
        topic: 'Node style',
        id: 'bd1c217f9d0b20bd',
        direction: 0,
        expanded: true,
        children: [
          {
            topic: 'Add icons',
            id: 'bd1d0317f7e8a61a',
            icons: ['😂'],
            tags: ['www'],
          },
        ],
      },
      {
        topic: 'Draggable',
        id: 'bd1f03fee1f63bc6',
        direction: 1,
        expanded: true,
        children: [
          {
            topic:
              'Drag a node to another node\nand the former one will become a child node of latter one',
            id: 'bd1f07c598e729dc',
          },
        ],
      }
    ],
    expanded: true,
  },
  linkData: {},
}
