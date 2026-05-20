import {
  Heading,
  List,
  ListOrdered,
  Code2,
  Quote,
  Sparkles,
  BookOpen,
  Brain,
} from 'lucide-react';

export const slashItems = [
  {
    title: 'Heading 1',
    description: 'Large section heading',
    type: 'h1',
    icon: Heading,
  },

  {
    title: 'Heading 2',
    description: 'Medium section heading',
    type: 'h2',
    icon: Heading,
  },

  {
    title: 'Bullet List',
    description: 'Create unordered list',
    type: 'bullet',
    icon: List,
  },

  {
    title: 'Numbered List',
    description: 'Create ordered list',
    type: 'number',
    icon: ListOrdered,
  },

  {
    title: 'Code Block',
    description: 'Insert code snippet',
    type: 'code',
    icon: Code2,
  },

  {
    title: 'Quote',
    description: 'Insert quote block',
    type: 'quote',
    icon: Quote,
  },

  {
    title: 'AI Summarize',
    description: 'Summarize current content',
    type: 'ai-summarize',
    icon: Sparkles,
  },

  {
    title: 'AI Explain',
    description: 'Explain current content',
    type: 'ai-explain',
    icon: Brain,
  },

  {
    title: 'Generate Flashcards',
    description: 'Create study flashcards',
    type: 'ai-flashcards',
    icon: BookOpen,
  },
];
