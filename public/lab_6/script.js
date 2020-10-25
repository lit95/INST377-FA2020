// You may wish to find an effective randomizer function on MDN.

const { reverse } = require("cypress/types/lodash");

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

async function handleEvent(evt) {
  const results= await fetch('/api');
  const json=results.json();
  console.log('jsonFromServer', json);
  const reverseList=json.sort((a,b)=>sortFunction(b,a,'name'));

  reverseList.array.forEach(element=> {
    const li=document.createElement('li')
    document.append(li);
  })
}

//const element = await(await arrayPromise()).split(' ');

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      console.log('jsonFromServer', jsonFromServer);
      const reverseList=newArr2.sort((a,b)=>sortFunction(b,a,'name'));
      
      //.catch((err)) => {
      //  console.log(err)
      //}
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const newArr=range(10);
      const newArr2=newArr.map(() => {
        const number=getRandomIntInclusive(0,243);
        return fromServer[number];
      });
    })
    .catch((err) => console.log(err));
});