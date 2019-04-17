"use strict";

document.body.onload = function() {
    const list = document.getElementById('list');
    var max = 5;

    function loadMore() {
        for (let i = max-5; i < max; i++) {
            let dbRef = firebase.database().ref().child('education').child(i);
            dbRef.on('value', function(snap) {
                if (snap.val()) {
                    let block = document.createElement('div');
                    block.setAttribute('class', 'block');
                    let date = document.createElement('p');
                    date.setAttribute('class', 'date');
                    let text = document.createElement('p');
                    let title = document.createElement('p');

                    date.innerText = snap.val().date;
                    text.innerText = snap.val().someText;
                    title.innerText = snap.val().title;

                    block.appendChild(date);
                    block.appendChild(text);
                    block.appendChild(title);
                    list.appendChild(block);
                }
            });
        }
        max += 5;
    }

    list.addEventListener('scroll', function() {
        if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
            loadMore();
        }
    });

    loadMore();
};