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
                let span = document.createElement('span');
                span.classList.add('hide');
                td.appendChild(span);
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
        let listTDLenght = listTD.length;

        for (let i = 0; i < listTDLenght; i++) {

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

                if (topLeftCell !== undefined && listTD.hasOwnProperty(topLeftCell)) {
                    if (listTD[topLeftCell].innerHTML === '<span>bomb</span>') counter++;
                }

                if (topCell !== undefined && listTD.hasOwnProperty(topCell)) {
                    if (listTD[topCell].innerHTML === '<span>bomb</span>') counter++;
                }

                if (topRightCell !== undefined && listTD.hasOwnProperty(topRightCell)) {
                    if (listTD[topRightCell].innerHTML === '<span>bomb</span>') counter++;
                }

                if (rightCell !== undefined && listTD.hasOwnProperty(rightCell)) {

                    if (listTD[rightCell].innerHTML === '<span>bomb</span>') counter++;
                }

                if (bottomRightCell !== undefined && listTD.hasOwnProperty(bottomRightCell)) {
                    if (listTD[bottomRightCell].innerHTML === '<span>bomb</span>') counter++;
                }

                if (bottomCell !== undefined && listTD.hasOwnProperty(bottomCell)) {
                    if (listTD[bottomCell].innerHTML === '<span>bomb</span>') counter++;
                }

                if (bottomLeftCell !== undefined && listTD.hasOwnProperty(bottomLeftCell)) {
                    if (listTD[bottomLeftCell].innerHTML === '<span>bomb</span>') counter++;
                }

                if (leftCell !== undefined && listTD.hasOwnProperty(leftCell)) {
                    if (listTD[leftCell].innerHTML === '<span>bomb</span>') counter++;
                }


                listTD[i].classList.add('green');
                listTD[i].innerHTML = `<span>${counter}</span>`;
            }
        }

    }

    this.isEmptyCell = function(cell) {
        let value = Number(cell.innerHTML);
        console.log(Number(value));
        return value === 0 || isNaN(value) ? false : true;
    }

    this.init = function() {
        this.createField();
        this.addMine();
        this.setNumber();
    }
}


let table = document.getElementById('field');
let miner = new Miner(table, 10, 10, 40);
miner.init();

table.addEventListener("click", (e) => {
    let target = e.target;
    if (target.tagName != 'SPAN') return;

    if (target.innerHTML === 'bomb') {
        target.classList.remove('hide')
    }
    let isEmpty = miner.isEmptyCell(target);

});