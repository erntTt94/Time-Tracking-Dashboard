const cards = document.querySelectorAll('.card-box');
const daily = document.querySelector('.daily');
const weekly = document.querySelector('.weekly');
const monthly = document.querySelector('.monthly');
const dateHolder = document.querySelector('ul');


async function getData() {
    try {
        const res = await axios.get('data.json');
        return res.data;
    } catch (e) {
        console.log('Error!', e);
    }
}


async function updateCard(id, date) {
    const data = await getData();
    cards.forEach((card, index) => {
        if (data[index]) {
            card.nextElementSibling.children[1].children[0].children[0].textContent = data[index].title;
            card.nextElementSibling.children[1].children[1].textContent = `${data[index].timeframes[id].current}hrs`;
            card.nextElementSibling.children[1].children[2].textContent = `Last ${date} - ${data[index].timeframes[id].previous}hrs`;
        } else {
            console.log(`There is no data for the current element - ${card.className} at index ${index}!`);
        }
    })
};


function activeDate(date) {
    date.classList.add('active');
    const children = dateHolder.children;
    for (child of children) {
        if (!(child.classList[0] === date.classList[0])) {
            child.classList.remove('active');
        }
    }
}

updateCard('weekly', 'Week');
activeDate(weekly);

daily.addEventListener('click', function () {
    updateCard('daily', "Day");
    activeDate(daily);

})
weekly.addEventListener('click', function () {
    updateCard('weekly', "Week");
    activeDate(weekly)

})
monthly.addEventListener('click', function () {
    updateCard('monthly', 'Month');
    activeDate(monthly);
})






