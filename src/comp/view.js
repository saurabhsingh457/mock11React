import { useState } from "react";
const baseURL = 'https://scary-lemming.cyclic.app';

const ViewNotice = () => {
    const [data, setData] = useState([]);
    const [updatedNotice, setUpdatedNotice] = useState({
        name: "",
        title: "",
        description: ""
    });
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedNoticeId, setSelectedNoticeId] = useState(null);

    const handleFetch = async () => {
        const request = await fetch(baseURL);
        const response = await request.json();
        setData(response);
    }

    handleFetch();

    const handleEditClick = (id) => {
        setShowEditForm(true);
        setSelectedNoticeId(id);
    }

    const handleEdit = async () => {
        const request = await fetch(baseURL + selectedNoticeId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedNotice)
        });
        const response = await request.json();
        alert(response.success || response.error);
        setShowEditForm(false);
        setSelectedNoticeId(null);
        setUpdatedNotice({
            name: "",
            title: "",
            description: ""
        });
        handleFetch();
    }

    const handleDelete = async (id) => {
        const request = await fetch(baseURL + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        alert(response.success || response.error);
        handleFetch();
    };

    const handleChange = (e) => {
        setUpdatedNotice({
            ...updatedNotice,
            [e.target.name]: e.target.value
        });
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        handleEdit();
    }

    return (
        <div id="view-div">
            {data.map(element => {
                if (element._id === selectedNoticeId && showEditForm) {
                    return (
                        <div key={element._id}>
                            <form onSubmit={handleEditFormSubmit}>
                                <label>
                                    name:
                                    <input type="text" name="name" value={updatedNotice.name} onChange={handleChange} />
                                </label>
                                <label>
                                    Title:
                                    <input type="text" name="title" value={updatedNotice.title} onChange={handleChange} />
                                </label>
                                <label>
                                    Description:
                                    <textarea name="description" value={updatedNotice.description} onChange={handleChange} />
                                </label>
                                <button type="submit">Save</button>
                                <button onClick={() => setShowEditForm(false)}>Cancel</button>
                            </form>
                        </div>
                    )
                } else {
                    return (
                        <div key={element._id}>
                            <p><strong>name: </strong>{element.name}</p>
                            <p><strong>Title: </strong>{element.title}</p>
                            <p><strong>Description: </strong>{element.description}</p>
                            <p><strong>Created At: </strong>{element.createdAt}</p>
                            <button onClick={() => handleEditClick(element._id)}>Edit</button>
                            <button onClick={() => handleDelete(element._id)}>Delete</button>
                        </div>
                    )
                }
            })}
        </div>
    )
};

export default ViewNotice;