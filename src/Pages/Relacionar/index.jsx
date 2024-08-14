import axios from 'axios';

import { useState, useEffect } from 'react';
import {
   DndContext,
   closestCenter,
   useSensor,
   useSensors,
   PointerSensor,
} from '@dnd-kit/core';
import {
   SortableContext,
   verticalListSortingStrategy,
   // arrayMove,
   useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Layout } from '../../components/Layout';

const SortableItem = ({ id, children }) => {
   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });
   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: '16px',
      margin: '0 0 8px 0',
      minHeight: '50px',
      backgroundColor: '#fff',
      color: '#333',
      border: '1px solid lightgrey',
   };

   return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
         {children}
      </div>
   );
};

export const Relacionar = () => {
   const [miembros, setMiembros] = useState([]);
   const [ministerios, setMinisterios] = useState([]);
   const [relaciones, setRelaciones] = useState([]);
   const sensors = useSensors(useSensor(PointerSensor));

   useEffect(() => {
      // Cargar los miembros y ministerios desde la base de datos
      const cargarDatos = async () => {
         await axios
            .get('http://localhost:3000/api/miembros')
            .then((response) => {
               console.log('Miembros: ', response.data);
               setMiembros(response.data);
            })
            .catch((error) => console.error('Error loading members:', error));

         await axios
            .get('http://localhost:3000/api/ministerios')
            .then((response) => {
               console.log('Ministerios: ', response.data);
               setMinisterios(response.data);
            })
            .catch((error) =>
               console.error('Error loading ministries:', error)
            );
      };

      cargarDatos();
   }, []);

   const handleDragEnd = (event) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
         const activeIndex = miembros.findIndex(
            (item) => item.id_miembro === active.id
         );
         const overIndex = ministerios.findIndex(
            (item) => item.id_ministerio === over.id
         );

         if (activeIndex !== -1 && overIndex !== -1) {
            const movedItem = miembros[activeIndex];
            axios
               .post('http://localhost:3000/api/relacionar', {
                  id_miembro: movedItem.id_miembro,
                  id_ministerio: ministerios[overIndex].id_ministerio,
               })
               .then((response) => {
                  console.log(response.data);
                  setRelaciones([
                     ...relaciones,
                     {
                        id_miembro: movedItem.id_miembro,
                        id_ministerio: ministerios[overIndex].id_ministerio,
                     },
                  ]);
               })
               .catch((error) =>
                  console.error('Error relating member and ministry:', error)
               );
         }
      }
   };

   return (
      <Layout>
         <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
         >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <div
                  style={{
                     margin: '8px',
                     border: '1px solid lightgrey',
                     borderRadius: '2px',
                     width: '200px',
                  }}
               >
                  <h3>Miembros</h3>
                  <SortableContext
                     items={miembros.map((item) => item.id_miembro)}
                     strategy={verticalListSortingStrategy}
                  >
                     {miembros.map((item) => (
                        <SortableItem
                           key={item.id_miembro}
                           id={item.id_miembro}
                        >
                           {item.nombres} {item.apellidos}
                        </SortableItem>
                     ))}
                  </SortableContext>
               </div>
               <div
                  style={{
                     margin: '8px',
                     border: '1px solid lightgrey',
                     borderRadius: '2px',
                     width: '200px',
                  }}
               >
                  <h3>Ministerios</h3>
                  <SortableContext
                     items={ministerios.map((item) => item.id_ministerio)}
                     strategy={verticalListSortingStrategy}
                  >
                     {ministerios.map((item) => (
                        <SortableItem
                           key={item.id_ministerio}
                           id={item.id_ministerio}
                        >
                           {item.nombre}
                        </SortableItem>
                     ))}
                  </SortableContext>
               </div>
            </div>
         </DndContext>
      </Layout>
   );
};

// import { Layout } from '../../components/Layout';

// import { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import axios from 'axios';

// export const Relacionar = () => {
//    const [miembros, setMiembros] = useState([]);
//    const [ministerios, setMinisterios] = useState([]);
//    const [relaciones, setRelaciones] = useState([]);

//    useEffect(() => {
//       // Cargar los miembros y ministerios desde la base de datos
//       const cargarDatos = async () => {
//          await axios
//             .get('http://localhost:3000/api/miembros')
//             .then((response) => {
//                console.log('Miembros: ', response.data);
//                setMiembros(response.data);
//             })
//             .catch((error) => console.error('Error loading members:', error));

//          await axios
//             .get('http://localhost:3000/api/ministerios')
//             .then((response) => {
//                console.log('Ministerios: ', response.data);
//                setMinisterios(response.data);
//             })
//             .catch((error) =>
//                console.error('Error loading ministries:', error)
//             );
//       };

//       cargarDatos();
//    }, []);

//    const onDragEnd = (result) => {
//       console.log('result: ', result);
//       const { source, destination } = result;

//       if (!destination) {
//          return;
//       }

//       if (
//          source.droppableId === 'miembros' &&
//          destination.droppableId === 'ministerios'
//       ) {
//          const movedItem = miembros[source.index];

//          // Crear la relación en la base de datos
//          axios
//             .post('http://localhost:3000/api/relacionar', {
//                id_miembro: movedItem.id_miembro,
//                id_ministerio: ministerios[destination.index].id_ministerio,
//             })
//             .then((response) => {
//                console.log(response.data);
//                // Actualizar las relaciones localmente (opcional)
//                setRelaciones([
//                   ...relaciones,
//                   {
//                      id_miembro: movedItem.id_miembro,
//                      id_ministerio:
//                         ministerios[destination.index].id_ministerio,
//                   },
//                ]);
//             })
//             .catch((error) =>
//                console.error('Error relating member and ministry:', error)
//             );
//       }
//    };

//    return (
//       <Layout>
//          <DragDropContext onDragEnd={onDragEnd}>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                <Droppable droppableId='miembros'>
//                   {(provided) => (
//                      <div
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         style={{
//                            margin: '8px',
//                            border: '1px solid lightgrey',
//                            borderRadius: '2px',
//                            width: '200px',
//                         }}
//                      >
//                         <h3>Miembros</h3>
//                         {miembros.map((item, index) => (
//                            <Draggable
//                               key={item.id_miembro}
//                               draggableId={item.id_miembro.toString()}
//                               index={index}
//                            >
//                               {(provided) => (
//                                  <div
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     style={{
//                                        userSelect: 'none',
//                                        padding: '16px',
//                                        margin: '0 0 8px 0',
//                                        minHeight: '50px',
//                                        backgroundColor: '#fff',
//                                        color: '#333',
//                                        ...provided.draggableProps.style,
//                                     }}
//                                  >
//                                     {item.nombres} {item.apellidos}
//                                  </div>
//                               )}
//                            </Draggable>
//                         ))}
//                         {provided.placeholder}
//                      </div>
//                   )}
//                </Droppable>

//                <Droppable droppableId='ministerios'>
//                   {(provided) => (
//                      <div
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         style={{
//                            margin: '8px',
//                            border: '1px solid lightgrey',
//                            borderRadius: '2px',
//                            width: '200px',
//                         }}
//                      >
//                         <h3>Ministerios</h3>
//                         {ministerios.map((item, index) => (
//                            <Draggable
//                               key={item.id_ministerio}
//                               draggableId={item.id_ministerio.toString()}
//                               index={index}
//                            >
//                               {(provided) => (
//                                  <div
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     style={{
//                                        userSelect: 'none',
//                                        padding: '16px',
//                                        margin: '0 0 8px 0',
//                                        minHeight: '50px',
//                                        backgroundColor: '#fff',
//                                        color: '#333',
//                                        ...provided.draggableProps.style,
//                                     }}
//                                  >
//                                     {item.nombre}
//                                  </div>
//                               )}
//                            </Draggable>
//                         ))}
//                         {provided.placeholder}
//                      </div>
//                   )}
//                </Droppable>
//             </div>
//          </DragDropContext>
//       </Layout>
//    );
// };
