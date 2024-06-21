document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemsList = document.getElementById('items-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    const items = JSON.parse(localStorage.getItem('items')) || [];

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemPrice = document.getElementById('item-price').value;

        const newItem = {
            name: itemName,
            price: parseFloat(itemPrice),
            sold: 0
        };

        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        addItemToDOM(newItem);
        updateTotalAmount();
        itemForm.reset();
    });

    items.forEach(addItemToDOM);
    updateTotalAmount();

    function addItemToDOM(item) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const itemName = document.createElement('span');
        itemName.textContent = `${item.name} - ₹${item.price}`;

        const soldCount = document.createElement('span');
        soldCount.textContent = `Sold: ${item.sold}`;

        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            item.sold++;
            soldCount.textContent = `Sold: ${item.sold}`;
            localStorage.setItem('items', JSON.stringify(items));
            updateTotalAmount();
        });

        const subtractButton = document.createElement('button');
        subtractButton.textContent = '-';
        subtractButton.addEventListener('click', () => {
            if (item.sold > 0) {
                item.sold--;
                soldCount.textContent = `Sold: ${item.sold}`;
                localStorage.setItem('items', JSON.stringify(items));
                updateTotalAmount();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            items.splice(items.indexOf(item), 1);
            localStorage.setItem('items', JSON.stringify(items));
            itemsList.removeChild(itemDiv);
            updateTotalAmount();
        });

        itemDiv.appendChild(itemName);
        itemDiv.appendChild(soldCount);
        itemDiv.appendChild(addButton);
        itemDiv.appendChild(subtractButton);
        itemDiv.appendChild(deleteButton);

        itemsList.appendChild(itemDiv);
    }

    function updateTotalAmount() {
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.sold), 0);
        totalAmountDisplay.textContent = `Total Sales Amount: ₹${totalAmount}`;
    }
});
