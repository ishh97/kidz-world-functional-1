const items = document.getElementById("items");
const add = document.querySelectorAll('.btn');
var cartCount = parseInt(localStorage.getItem("count")) || 0;
const selectedItems = [];

function updateCart(bookName) {
    cartCount++;
    items.textContent = cartCount;
    localStorage.setItem("count", cartCount);
    localStorage.setItem("bookName", bookName);

}


add.forEach((addBtn, index) => {
    addBtn.addEventListener('click', function() {
        // cartCount++;
        items.textContent = cartCount;
        const bookIcon = this.closest('.bookicon');
        const bookNameElement = bookIcon.querySelector('.name');
        const bookName = bookNameElement.textContent;

        if (selectedItems[bookName]) {
            selectedItems[bookName].quantity++;
        } else {
            selectedItems[bookName] = {
                quantity:1,
                price: parseFloat(document.querySelectorAll('.price h5')[index].textContent.replace('$', ''))
            };
        }
        // selectedItems.push({
        //     bookName: bookName,
        //     index: index
        // });
        updateCart(bookName);
    });
});


function printSelectedItems() {
    // console.log("Selected Items:");

    for (const item in selectedItems) {
        const itemName = item;
        const quantity = selectedItems[item].quantity;

        console.log(`Item Name: ${itemName} - Quantity: ${quantity}`);
    }
    const Amount = calculateTotalAmount();
    console.log(`The total amount is $${Amount.toFixed(2)}`);
}

function calculateTotalAmount() {
    let totalAmount = 0;
    for (const item in selectedItems) {
        const quantity = selectedItems[item].quantity;
        const price = selectedItems[item].price;
        totalAmount += quantity * price;
    }
    return totalAmount;
}

    // selectedItems.forEach(item => {
    //     const bookName = item.bookName;
    //     const index = item.index;
    //     const price = parseFloat(document.querySelectorAll('.price h5')[index].textContent.replace('$', ''));
    //     const quantity = 1; 

    //     console.log(`Book Name: ${bookName}, Price: $${price}, Quantity: ${quantity}`);
    // });



document.getElementById("nav").addEventListener('click', printSelectedItems)

// console.log(cartCount);
window.addEventListener('beforeunload', function() {
    localStorage.setItem("count", 0);
    cartCount = 0;
});


// item name : this is our pact - quantity : 3
// item name : connect 4 - quantity : 2
// item name : harry potter  - quantity :1
//the total amount is 36$ and 66 cents