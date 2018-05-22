const brain = require('brain.js');
let smartNet;

const encode = arg => {
  let sign;
  let num;
  if (arg <= 0) {
    arg = arg * -1;
    sign = 0;
  } else {
    sign = 1;
  }
  num = parseInt(arg, 10);
  let biarray = num.toString(2).split('');
  while (biarray.length < 7) {
    biarray.push(0);
  }
  let obj = biarray.reduce((acc, val, index) => {
    acc[index] = val * 1;
    return acc;
  }, {});
  obj.sign = sign;

  console.log(obj);
  return obj;
};

const processTrainingData = dataArray => {
  return dataArray.map(data => {
    return {
      input: encode(data.input),
      output: data.output
    };
  });
};
const train = dataArray => {
  let net = new brain.NeuralNetwork();
  net.train(processTrainingData(dataArray), {
    iterations: 20000,
    errorThresh: 0.005
  });
  smartNet = net.toFunction();
  console.log('Finished training...');
};

function execute(input) {
  let results = smartNet(encode(input));
  console.log(results);
  let result = Object.keys(results).reduce((max, key) => {
    if (results[max] < results[key]) max = key;
    return max;
  });
  console.log(result);
  return result;
}

const trainingData = [
  {
    input: 100,
    output: { hot: 1 }
  },
  {
    input: 90,
    output: { hot: 1 }
  },
  {
    input: 85,
    output: { hot: 1 }
  },
  {
    input: 82,
    output: { hot: 1 }
  },
  {
    input: 65,
    output: { warm: 1 }
  },
  {
    input: 74,
    output: { warm: 1 }
  },
  {
    input: 60,
    output: { warm: 1 }
  },
  {
    input: 58,
    output: { chilly: 1 }
  },
  {
    input: 54,
    output: { chilly: 1 }
  },
  {
    input: 48,
    output: { chilly: 1 }
  },
  {
    input: 32,
    output: { cold: 1 }
  },
  {
    input: 25,
    output: { cold: 1 }
  },
  {
    input: 0,
    output: { cold: 1 }
  },
  {
    input: -15,
    output: { cold: 1 }
  },
  {
    input: -25,
    output: { cold: 1 }
  }
];

module.exports = {
  train,
  trainingData,
  execute,
  processTrainingData,
  encode,
  smartNet
};
