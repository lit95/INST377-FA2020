function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1); // The maximum is inclusive and the minimum is inclusive
}

function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const arrayOfTenItems = range(10);
  const randomRestaurantsArray = arrayOfTenItems.map((item) => {
    const which = getRandomIntInclusive(0, restaurantList.length);
    const restaurant = restaurantList[which];
    return restaurant;
  });

  console.table(randomRestaurantsArray);

  const newDataShape = randomRestaurantsArray.reduce((collection, item, i) => {
    const findCat = collection.find((findItem) => findItem.label === item.category);
    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      findCat.y += 1;
    }
    return collection;
  }, []);

  return newDataShape;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants by Category',
      labelFontSize: 12,
      scaleBreaks: {
        type: 'wavy',
        customBreaks: [{
          color: '#99AFD3',
          startValue: 40,
          endValue: 50
        },
        {
          startValue: 85,
          endValue: 100
        },
        {
          startValue: 140,
          endValue: 175
        }

        ]
      } // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

async function loadData() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
  const json = await data.json();

  const arrayOfTenItems = range(10);
  const randomRestaurantsArray = arrayOfTenItems.map((item) => {
    const which = getRandomIntInclusive(0, json.length);
    const restaurant = json[which];
    return restaurant;
  });

  console.table(randomRestaurantsArray);

  const div = document.createElement('div');
  div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantsArray[0])}<br /><br />`;
  $('body').append(div);

  const newDataShape = randomRestaurantsArray.reduce((collection, item, i) => {
    const findCat = collection.find((findItem) => findItem.label === item.category);
    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      findCat.y += 1;
    }
    return collection;
  }, []);

  const newDataShape2 = randomRestaurantsArray.reduce((collection, item, i) => {
    const findCat = collection.find((findItem) => findItem.label === item.category);
    
    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      findCat.y += 1;
    }
    return collection;
  }, []);
  console.table(newDataShape);

  const div2 = document.createElement('div');
 // const obj = {
   // label: randomRestaurantsArray[0].category,
    //y: randomRestaurantsArray.length
  //};
  div2.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantsArray[0])}<br /><br />`;
  $('body').append(div2);
}

window.onload = loadData;

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});