Automated Decision System Final Project
=======================================

Theo: Siri with a fashion sense
-------------------------------

For my final project I implemented a system that recommends new fashion items based on what the user has in her cart.

The user will see a feed of items sampled randomly from the database. When the user selects one item, it will be added to the cart on the right.
The feed is created using infinite scroll that updates with items from the database as the user scrolls down.

This project uses a ReactJS framework. This keeps the page well-structured. React utilizes components, where components propagate data to their child components. The uni-directional data flow structure of React re-renders all components when the data store changes. Children of components will update as the data propagates. Take a look at user.js for my implementation of React.

The React framework makes it easy to implement the shopping cart. When a Panel is selected, a callback sends a dispatcher to the data store. This action then propagates the new list of cart items to the top container's children, which includes the Cart component. You can also click on the Cart's components, which will similarly send a dispatcher to the top and update the data store.

I use Parse for Theo's database. I utilize Parse's REST API to upload objects to the database using python (look at upload.py). This database represents a graph and its edges. Edges indicate that items are selected as a match. These matches are determined by "experts", using the /expert portal.  The edges are weighted and the weight comes from the number of times to items were determined to be a match. Graph.png visualizes the entire graph which contains all items in the database, where each node is an item and each edge shows which other items it is matched with and the strength of that match. The code for expert-informed matching and creating weighted edges can be found in expert_api.js and expert_init.js. The code for creating the visual graph is in graph.py and the graph itself is graph.png. You can create new matches yourself by going to /expert and saving the matches.

I use this graph to create recommendations for items the user put into her cart. The rule for choosing related items is which nodes in the graph are most heavily connected to the selected item. These relationships will be determined by “experts”, who will manually decide which items go well with item A. This way, the recommendations will be based on real subjective input. The relationships between items will result in a weighted graph.
