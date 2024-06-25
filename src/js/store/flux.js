const getState = ({ getStore, getActions, setStore }) => {
    return {
		store: {
            contacts: []
        },
        actions: {
            getContacts: async () => {

                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/huber0018/contacts")
                    if (response.status === 404) {
                        await getActions().createUser();
                        await getActions().getContacts();
                    }

                    if (response.ok == false) {
                        throw new "Error en contacto"
                    }
                    const data = await response.json();
                    console.log(data)

                    setStore({contactos: data.contacts});
                } 
                catch(error) {
                    console.log(error)
                }
            },

            createContact: async (contact) => {
                
                try{
                    console.log(contact)
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/huber0018/contacts", {
                        method: "POST",
                        body: JSON.stringify(contact),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok == false) {
                        throw "Error al crear contacto"
                    }
					const data = await response.json()
                    setStore({ contactos: [...getStore().contactos, data] })
                
                } catch(error) {
                    console.log(error)
                }
            },
            
            editContact: async (Contact) => {
               
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/huber0018/contacts/${contact.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(Contact)
                    });

                    if (response.ok) {
                        const actions = getActions()
                        actions.getContacts()
                    }
                } catch(error) {
                    console.log("Error actualizando contacto:", error)
                }
            },

            createAgenda: async (contact) => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/huber0018", {
                        method: "POST",
                        body: JSON.stringify(contact),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                        if (!response.ok) {
                            throw Error("Error creando agenda")
                        }
                    } catch(error) {
                    console.log(error)
                }
            },

            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/huber0018/contacts/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        getActions().getContacts();

                        const contactDelete = getStore().contactos.filter(contact => contact.id !== id)
                    setStore ({ contactos: contactDelete })

                    } else {
                        console.error("Error eliminando contacto:", response.status);
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }
    };
};

export default getState;