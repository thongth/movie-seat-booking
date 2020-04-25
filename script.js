const movie = document.querySelector('#movie');
const seats = document.querySelectorAll('.row .seat');
const totalSelectedSeats = document.getElementById('count');
const totalPrice = document.getElementById('total');
const container = document.querySelector('.container');
const screen = document.querySelector('.screen');

let moviePrice = +movie.value;

populateUI();

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    totalSelectedSeats.innerText = selectedSeatsCount;
    totalPrice.innerText = selectedSeatsCount * moviePrice;
}

function setMovieData(index, value){
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selectedMoviePrice', value);
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats != null && selectedSeats.length > 0) {
        selectedSeats.forEach(seatNumber => {
            seats[seatNumber].classList.add('selected');
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovie');
    if(selectedMovieIndex != null){
        movie.selectedIndex = selectedMovieIndex;
    }
}

movie.addEventListener('click', e => {
    moviePrice = +movie.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

container.addEventListener('click', e => {
    if(e.target.classList.contains('seat')
        && !e.target.classList.contains('occupied')){
        
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

screen.addEventListener('click', e => {
    seats.forEach( seat => {
        if(seat.classList.contains('selected')){
            seat.classList.remove('selected');
        }
    });
    localStorage.setItem('selectedSeats', JSON.stringify([]));
    localStorage.setItem('selectedMoviePrice', 0);
    populateUI();
    updateSelectedCount();
})

updateSelectedCount();