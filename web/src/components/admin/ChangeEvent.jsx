import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import classes from './ChangeEvent.module.css';

export default function ChangeEvent() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const [eventData, setEventData] = useState({
        name: '',
        category: '',
        date: '',
        location: '',
        description: '',
        image: '',
        price: '',
        relatedEvents: [],
    });

    const { id } = useParams();

    const navigate = useNavigate();

    const getEvent = async () => {
        try {
            const res = await axios.get(`http://localhost:9003/api/v1/events/get-event/${id}`);
            const event = res.data;
            const formattedDate = event.date.split('T')[0];

            setEventData({ ...event, date: formattedDate });
            setSelectedCategory(event.category);
            setImagePreview(`/uploads/${event.image}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            getEvent();
        }
    }, [id]);

    const handleNameChange = (event) => {
        setEventData({ ...eventData, name: event.target.value });
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setEventData({ ...eventData, category: event.target.value });
    };

    const handleDateChange = (event) => {
        setEventData({ ...eventData, date: event.target.value });
    };

    const handleDescriptionChange = (event) => {
        setEventData({ ...eventData, description: event.target.value });
    };

    const handlePriceChange = (event) => {
        setEventData({ ...eventData, price: event.target.value });
    };

    const handleLocationChange = (event) => {
        setEventData({ ...eventData, location: event.target.value });
    };

    const handleImagePreview = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setSelectedImage((e.target.files[0]));
        };
    };

    const editEvent = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            console.log(eventData.category);
            formData.append('name', eventData.name);
            formData.append('category', eventData.category);
            formData.append('date', eventData.date);
            formData.append('location', eventData.location);
            formData.append('description', eventData.description);
            formData.append('image', selectedImage);
            formData.append('price', eventData.price);
            if (eventData.relatedEvents.length > 0) {
                formData.append(
                    'relatedEvents',
                    JSON.stringify(eventData.relatedEvents)
                );
            }

            if (
                formData.get('name') !== '' &&
                formData.get('category') !== '' &&
                formData.get('date') !== '' &&
                formData.get('location') !== '' &&
                formData.get('description') !== '' &&
                formData.get('price') !== '' &&
                formData.get('image') !== ''
            ) {
                const res = await axios.patch(
                    `http://localhost:9003/api/v1/events/update-event/${id}`,
                    formData
                );
                if (res.status === 200) {
                    console.log('Event edited successfully');
                    navigate('/admin/events');
                } else {
                    throw new Error(
                        `Failed to edit event with status ${res.status}`
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id={classes.editEvent}>
            <form method="post" className={classes.editEventForm}>
                <div className={classes.topForm}>
                    <div className={classes.formLeft}>
                        <div className={classes.fieldContainer}>
                            <label
                                htmlFor="eventName"
                                className={classes.label}
                            >
                                Event Name
                            </label>
                            <input
                                type="text"
                                className={classes.input}
                                value={eventData.name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>
                        <div className={classes.uploadContainer}>
                            <label
                                htmlFor="file"
                                name="image"
                                className={classes.button + ' ' + classes.buttonUpload}
                            >
                                Upload Event Art
                            </label>
                            <input
                                type="file"
                                name="image"
                                id="file"
                                onChange={handleImagePreview}
                                required
                            />
                        </div>

                        <div className={classes.imagePreview}>
                            {imagePreview === null && <p>Event Photo</p>}
                            {imagePreview && <img src={imagePreview} alt="Event Photo" />}
                        </div>
                    </div>

                    <div className={classes.formRight}>
                        <div className={classes.categoryAndDate}>
                            <div className={classes.fieldContainer}>
                                <label className={classes.label}>
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className={classes.input}
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Musical Concert">
                                        Musical Concert
                                    </option>
                                    <option value="Stand-Up Comedy">
                                        Stand Up Comedy
                                    </option>
                                </select>
                            </div>
                            <div className={classes.fieldContainer}>
                                <label className={classes.label}>Date</label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={eventData.date}
                                    onChange={handleDateChange}
                                    className={classes.input}
                                    required
                                />
                            </div>
                        </div>
                        <div className={classes.fieldContainer}>
                            <label className={classes.label}>
                                Event Details
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={eventData.description}
                                onChange={handleDescriptionChange}
                                className={classes.textarea}
                                required
                            />
                        </div>
                        <div className={classes.priceAndLocation}>
                            <div className={classes.fieldContainer}>
                                <label className={classes.label}>
                                    Ticket Price (€)
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={eventData.price}
                                    onChange={handlePriceChange}
                                    className={classes.input}
                                    required
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <label className={classes.label}>
                                    Location
                                </label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={eventData.location}
                                    onChange={handleLocationChange}
                                    className={classes.input}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.relatedEvents}>
                    <div className={classes.fieldContainer}>
                        <label className={classes.label}>Related Events</label>
                        <div className={classes.relatedSelection}>
                            <input className={classes.input} type="text" />
                            <button
                                className={
                                    classes.button + ' ' + classes.buttonAdd
                                }
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* <div className={classes.relatedEventsList}>
                        <div className={classes.relatedEvent}>
                            <img
                                className={classes.relatedEventImg}
                                src="/assets/event-example.jpeg"
                                alt=""
                            />
                            <div className={classes.relatedEventInfo}>
                                <div>
                                    <p className={classes.relatedEventName}>
                                        Norah Jones
                                    </p>
                                    <p className={classes.relatedEventDate}>
                                        June 9th 2023
                                    </p>
                                    <p className={classes.relatedEventLocation}>
                                        Vienna, Austria
                                    </p>
                                </div>
                                <button
                                    className={
                                        classes.button +
                                        ' ' +
                                        classes.buttonRemove
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>

                <button
                    className={classes.button + ' ' + classes.buttonSave}
                    onClick={editEvent}
                >
                    Save
                </button>
            </form>
        </div>
    );
}
