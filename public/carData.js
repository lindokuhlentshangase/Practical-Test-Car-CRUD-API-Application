
document.getElementById('fetchPopularCar').addEventListener('click', async function () {
    try {
        const response = await axios.get('http://localhost:3005/api/most-popular-cars');
        const carResultDiv = document.getElementById('carResult');
        const mostPopularCar = response.data;

        carResultDiv.innerHTML = `
            <p><strong>Most Popular Car Model:</strong> ${mostPopularCar.makeAndModel}</p>
            <p><strong>Count:</strong> ${mostPopularCar.count}</p>
        `;
    } catch (error) {
        console.error('Error fetching most popular car:', error);
        document.getElementById('carResult').innerHTML = 'Error fetching data. Please try again.';
    }
});
document.getElementById('addCarForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const newCar = {
        color: document.getElementById('color').value,
        model: document.getElementById('model').value,
        make: document.getElementById('make').value,
        reg_number: document.getElementById('reg_number').value
    };

    try {
        const response = await axios.post('http://localhost:3005/api/cars', newCar);
        alert('Car added successfully!');
        document.getElementById('addCarForm').reset();
    } catch (error) {
        console.error('Error adding car:', error);
        alert('Error adding car. Please try again.');
    }
});

document.getElementById('removeCarForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const reg_number = document.getElementById('reg_numberToRemove').value;
    try {
        // Send DELETE request
        await axios.delete(`http://localhost:3005/api/cars/${reg_number}`);
        alert('Car removed successfully!');
        document.getElementById('removeCarForm').reset();
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Car not found
            alert('Car not found.');
        } else {
            // General error
            alert('Error removing car. Please try again.');
        }
    }
});
