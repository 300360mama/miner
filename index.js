function Miner(table, row, col, quantityMine) {

    this.table = table;
    this.row = parseInt(row);
    this.col = parseInt(col);
    this.quantityMine = quantityMine;

    this.createField = function() {

        let fragment = document.createDocumentFragment();

        for (let i = 0; i < this.row; i++) {

            let tr = document.createElement('tr');

            for (let j = 0; j < this.col; j++) {
                let td = document.createElement('td');
                td.classList.add('hide');
                tr.appendChild(td);
            }

            fragment.appendChild(tr);

        }

        this.table.appendChild(fragment);
    }

    this.addMine = function() {
        if (this.quantityMine > this.col * this.row / 2) {
            this.quantityMine = this.col * this.row / 2;
        }

        let listTD = this.table.querySelectorAll('td');
        let randomList = this.generateRandomUniuqeList(this.quantityMine, 0, this.col * this.row);


        for (let i = 0; i < listTD.length; i++) {
            if (randomList.includes(i)) {
                listTD[i].classList.add('red');
                listTD[i].innerHTML = '<span>bomb</span>';
            }
        }
    }

    this.generateRandomUniuqeList = function(quantityElement, min, max) {

        let list = [];

        while (list.length < quantityElement) {

            let rand = Math.floor(Math.random() * (max - min + 1)) + min;

            if (list.includes(rand)) continue;

            list.push(rand);
        }

        return list;
    }


    this.setNumber = function() {

        let listTD = this.table.querySelectorAll('td');

        let listTDLEnght = listTD.length;

        for (let i = 0; i < listTDLEnght; i++) {

            let topLeftCell = i % this.col === 0 ? undefined : i - this.col - 1;
            let topCell = i - this.col;
            let topRightCell = (i + 1) % this.col === 0 ? undefined : i - this.col + 1;
            let rightCell = (i + 1) % this.col === 0 ? undefined : i + 1;
            let bottomRightCell = (i + 1) % this.col === 0 ? undefined : i + this.col + 1;
            let bottomCell = i + this.col;
            let bottomLeftCell = i % this.col === 0 ? undefined : i + this.col - 1;
            let leftCell = i % this.col === 0 ? undefined : i - 1;

            if (!listTD[i].innerHTML) {

                let counter = 0;
                if (listTD[topLeftCell] !== undefined && listTD[topLeftCell].innerHTML === 'bomb') {
                    counter++;
                }

                if (listTD[topCell] !== undefined && listTD[topCell].innerHTML === 'bomb') {
                    counter++;
                }
                if (listTD[topRightCell] !== undefined && listTD[topRightCell].innerHTML === 'bomb') {
                    counter++;
                }
                if (listTD[rightCell] !== undefined && listTD[rightCell].innerHTML === 'bomb') {
                    counter++;
                }
                if (listTD[bottomRightCell] !== undefined && listTD[bottomRightCell].innerHTML === 'bomb') {
                    counter++;
                }
                if (listTD[bottomCell] !== undefined && listTD[bottomCell].innerHTML === 'bomb') {
                    counter++;
                }
                if (listTD[bottomLeftCell] !== undefined && listTD[bottomLeftCell].innerHTML === 'bomb') {
                    counter++;
                }
                if (listTD[leftCell] !== undefined && listTD[leftCell].innerHTML === 'bomb') {
                    counter++;
                }

                listTD[i].classList.add('green');
                listTD[i].innerHTML = `<span>${counter}</span>`;
            }
        }

    }

    this.init = function() {
        this.createField();
        this.addMine();
        this.setNumber();
    }
}

function FindMine() {

}
let table = document.getElementById('field');
let miner = new Miner(table, 30, 16, 99);
miner.init();

table.addEventListener("click", (e) => {
    let target = e.target;

    if (target.tagName != 'TD') return

    target.classList.remove('hide');
});