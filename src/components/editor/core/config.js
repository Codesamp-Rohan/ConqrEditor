import theme from './theme';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { ListNode, ListItemNode } from '@lexical/list';

const editorConfig = {
  namespace: 'ConqrEditor',
  theme,
  onError(error) {
    throw error;
  },

  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    CodeHighlightNode,
  ],
};

export default editorConfig;
