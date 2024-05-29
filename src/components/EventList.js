// EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Grid, Box, CardHeader, Avatar, CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';

function EventCard({ event }) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }}>
                        {event.summary.charAt(0)}
                    </Avatar>
                }
                title={event.summary}
                subheader={`From: ${new Date(event.start_time).toLocaleString()} To: ${new Date(event.end_time).toLocaleString()}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {event.description}
                </Typography>
                <Box mt={2}>
                    <Typography variant="h6">Participants:</Typography>
                    {event.participants.map((participant, index) => (
                        <Typography key={index} variant="body2" color="textSecondary">
                            {participant.name} ({participant.email})
                        </Typography>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/events')  // Replace with your API endpoint
            .then(response => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the event data!", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    There was an error loading the events.
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {events.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <EventCard event={event} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default EventList;
