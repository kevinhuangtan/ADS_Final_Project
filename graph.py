APPLICATION_ID = "p5I9NyojKedE07IADm4FjywrHKBWorN7H3zMfcjC"
REST_API_KEY = "9lnS6G72fyFJ72Nm6ThDz2o9Y7CuOY9FtityL8Wh"
MASTER_KEY = "P3raIT3X0QDX23OxScil9aaYHJ74Zw4YoxQcNBOJ"

from parse_rest.connection import register
from parse_rest.datatypes import Object

register(APPLICATION_ID, REST_API_KEY)

Item = Object.factory("Item")
items = Item.Query.all().order_by("brand")


import networkx as nx
import matplotlib.pyplot as plt
#
nodes = [item.objectId for item in items] #ids of items

G = nx.Graph() # graph with items
for item in items:
    try:
        edges = item.edges
        G.add_node(item.objectId)
        for e in edges:
            G.add_edge(item.objectId, e, weight = edges[e])
    except AttributeError:
        pass

ehuge=[(u,v) for (u,v,d) in G.edges(data=True) if d['weight'] > 6.0]
elarge=[(u,v) for (u,v,d) in G.edges(data=True) if (d['weight'] >1.0 and d['weight'] <= 6.0)]
esmall=[(u,v) for (u,v,d) in G.edges(data=True) if d['weight'] <=1.0]
pos=nx.spring_layout(G)

nx.draw_networkx_nodes(G,pos,node_size=100)
nx.draw_networkx_edges(G,pos,edgelist=ehuge, edge_color='r',
                    width=4)
nx.draw_networkx_edges(G,pos,edgelist=elarge,
                    width=2)
nx.draw_networkx_edges(G,pos,edgelist=esmall,
                    width=1,alpha=0.5,edge_color='b',style='dashed')
plt.show()
