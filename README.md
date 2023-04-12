# Parse String Chat

Simple Kata exercise to parse strings and recognise chat sentences.

# <a name="prerequisites"></a> Prerequisites

1. [Node.js](https://nodejs.org/) 
2. [Npm](https://www.npmjs.com)

## Launch
Go to the root directory of this project (i.e. where this README is), open a terminal and type

```
npm run start
```

## Steps

### Step 1 (single sentence)

_note:_ an example only with a sentence

Given the input

```
14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

The output should be

```
[{
  date: '14:24:32',
  mention: '14:24:32 Customer : ',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  type: 'customer'
}]
```

### Step 2 (two sentences)

_note:_ an example with two sentences divided by new line character

Given the input

```
14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.
```

The output should be

```
[{
  date: '14:24:32',
  mention: '14:24:32 Customer : ',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
  type: 'customer'
}, {
  date: '14:26:15',
  mention: '14:26:15 Agent : ',
  sentence: 'Aliquam non cursus erat, ut blandit lectus.',
  type: 'agent'
}]
```

### Step 3 (two customer mentions as start)

_note:_ an example with two customer mentions as start

Given the input

```
14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.
14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.
14:28:28 Customer : Contrary to popular belief, Lorem Ipsum is not simply random text.
```

The output should be

```
[{
  date: '14:24:32',
  mention: '14:24:32 Customer : ',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
  type: 'customer'
}, {
  date: '14:27:00',
  mention: '14:27:00 Customer : ',
  sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n',
  type: 'customer'
}, {
  date: '14:27:47',
  mention: '14:27:47 Agent : ',
  sentence: 'Vestibulum tempor diam eu leo molestie eleifend.\n',
  type: 'agent'
}, {
  date: '14:28:28',
  mention: '14:28:28 Customer : ',
  sentence: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  type: 'customer'
}]
```

### Step 4 (date splitting)

_note:_ an example in which the sentences are not divided by the new line character

Given the input

```
14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.
```

The output should be

```
[{
  date: '14:24:32',
  mention: '14:24:32 Customer : ',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  type: 'customer'
}, {
  date: '14:26:15',
  mention: '14:26:15 Agent : ',
  sentence: 'Aliquam non cursus erat, ut blandit lectus.',
  type: 'agent'
}]
```

### Step 5 (ignore extra dates)

_note:_ an example with a date in the text of the Agent

Given the input

```
14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.
```

The output should be

```
[{
  date: '14:24:32',
  mention: '14:24:32 Customer : ',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  type: 'customer'
}, {
  date: '14:26:15',
  mention: '14:26:15 Agent : ',
  sentence: 'I received it at 12:24:48, ut blandit lectus.',
  type: 'agent'
}]
```

### Step 6 (full name)

_note:_ an example in which both the Agent and the Customer have full name

Given the input

```
14:24:32 Luca Galasso : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Emanuele Querzola : I received the package, ut blandit lectus.
```

The output should be

```
[{
  date: '14:24:32',
  mention: '14:24:32 Luca Galasso : ',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  type: 'customer'
}, {
  date: '14:26:15',
  mention: '14:26:15 Emanuele Querzola : ',
  sentence: 'I received the package, ut blandit lectus.',
  type: 'agent'
}]
```

### Step 7 [Extra] (missing colon after the names)

_note:_ an example in which there is no colon after both Agent and Customer names

Given the input

```
14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.
```

The output should be

```
[{
  date: '14:24:32',
  mention: '14:24:32 Customer ',
  sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  type: 'customer'
}, {
  date: '14:26:15',
  mention: '14:26:15 Agent ',
  sentence: 'I received it at 12:24:48, ut blandit lectus.',
  type: 'agent'
}]
```

## Output

Two kind of outputs:

1. Console in the terminal from which you launched ```npm run start``` (an array per step is shown);
2. One text file per step in the root directory.