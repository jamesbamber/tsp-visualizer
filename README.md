# TSP visualizer guide

## The TSP problem
This is a visualizer for the [Travelling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem), showing a live animation of the problem with a variable number of points and selectable algorithms.
The problem consists of finding the shortest cycle that visits all N given points in the Cartesian plane.
This problem is known to be NP-hard, so the available algorithms are heuristic and don't always find the optimal solution.


## Generating Points 

There are two ways to generate points:
- You can select the number of points using the 'Number of Points' slider and then press the 'Generate' button.
- You can manually enter the coordinates of the points in the textbox labelled 'List of Points' and then press the 'Load' button.

The list of points in the textbox must have numbers from 0 to 1000 (they will then be rescaled onto the canvas), the x and y coordinate must be separated by a space and different points must be separated by a newline.
The points textbox can also be used to modify the loaded points configuration: note that for the changes to apply you need to press the 'Load' button again.


## Running the Simulation

You can choose the algorithm from the dropdown menu on the left and then press the 'Run' button to begin the simulation.
The speed of the simulation can be controlled using the 'Delay' slider.

It is possible to stop the simulation while it's running by pressing the same button, which will now display 'Stop'.

The live distance of the path will be displayed at the top of the screen, along with the best path found so far by the simulation.


## Available Algorithms

- **Nearest Neighbor**: starts from a random point and then iteratively visits the nearest unvisited point. 
- **Nearest Neighbor with two opt exchange**: after running Nearest Neighbor it keeps looking for greedy swaps in the path. 
- **Random**: generates a uniformly random path.
- **Farthest Neighbor**: starts from a random point and then iteratively visits the farthest unvisited point. 
- **Simulated Annealing**: a heuristic search algorithm, you can find out more [here](https://cp-algorithms.com/num_methods/simulated_annealing.html).

## Registration and Login

You can register using the button in the top right of the screen, and later login using your credentials.
Your password must have at least 6 characters, username and password cannot contain spaces. 
After logging in it is possible to save your point sets using the 'Save' button under the 'List of Points' textbox, after that you must enter a name for the set. 
If you are logged in, all of your saved point sets will be visible in the scroll menu at the bottom left of the screen, where they can be loaded or deleted using the appropriate buttons.

Some point sets have already been saved with the following credentials:
- **Username**: `james`
- **Password**: `tspvis`
