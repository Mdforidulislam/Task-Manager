import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Mock data
const initialData = {
  todo: [
    { id: 'task-1', content: 'Task 1', status: 'todo' },
    { id: 'task-2', content: 'Task 2', status: 'todo' },
    { id: 'task-3', content: 'Task 2', status: 'todo' },
  ],
  inProgress: [
       { id: 'task-4', content: 'Task 1', status: 'inprogress' },
      { id: 'task-5', content: 'Task 1', status: 'inprogress' },
      { id: 'task-6', content: 'Task 1', status: 'inprogress' }
      ],
  completed: [
  { id: 'task-7', content: 'Task 2', status: 'completed' },
  { id: 'task-8', content: 'Task 2', status: 'completed' },
  { id: 'task-9', content: 'Task 2', status: 'completed' },
  { id: 'task-10', content: 'Task 2', status: 'completed' }
],
};



const YourComponent = () => {
  const [data, setData] = useState(initialData);

  // Simulating API call to fetch data
  useEffect(() => {
    // Replace this with your API call to fetch actual data
    // For now, setting initial demo data
    setData(initialData);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
  
    // Check if the drop is outside the droppable area
    if (!destination) return;
  
    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    const updatedData = { ...data };
    const draggableItem = updatedData[source.droppableId].find(
      (item) => item.id === draggableId
    );
  
    // Remove from the source list
    updatedData[source.droppableId] = updatedData[source.droppableId].filter(
      (item) => item.id !== draggableId
    );
  
    // Create a new object with the updated status
    const updatedItem = {
      ...draggableItem,
      status: destination.droppableId,
    };
  
    // Add to the destination list
    updatedData[destination.droppableId].splice(
      destination.index,
      0,
      updatedItem
    );
  
    setData(updatedData);
  };

  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board flex flex-col md:flex-row gap-6 justify-around  w-full ">
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="column"
            >
              <h2>Todo</h2>
              {data.todo.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="task"
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* last  */}

        <Droppable droppableId="inprogress">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="column"
            >
              <h2>InProgress</h2>
              {data.inProgress.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="task"
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Complated */}

        <Droppable droppableId="completed">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="column"
            >
              <h2>Complated</h2>
              {data.completed.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="task"
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Droppable for 'InProgress' and 'Completed' can be similarly structured */}
        {/* For brevity, I'm not repeating the code for these columns */}
      </div>
    </DragDropContext>
  );
};

export default YourComponent;