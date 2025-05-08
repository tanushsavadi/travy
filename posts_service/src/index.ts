import express from 'express';
import type { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Check if Supabase environment variables are set
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Supabase URL or Key not found in environment variables. Please create a .env file with SUPABASE_URL and SUPABASE_KEY.');
    process.exit(1); // Exit if Supabase credentials are not set
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors()); // Middleware to allow requests from all origins
app.use(express.json()); // Middleware to parse JSON bodies

// Simple root endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from the Posts microservice!');
});

// Endpoint to remove a post from Supabase
app.delete('/remove_post', async (req: Request, res: Response): Promise<any> => {

    const { rideType, post_id } = req.body;
    if (!rideType || !post_id) {
        return res.status(400).json({ error: 'Insufficient data: No ride type or post ID' });
    }

    try {
        const { data, error } = await supabase
            .from(`${rideType}_posts`)
            .delete()
            .eq('id', post_id);

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        res.status(200).json(data);
    } catch (error: any) {
        console.error('Error removing post from Supabase:', error.message);
        res.status(500).json({ error: 'Failed to remove post', details: error.message });
    }
});

// Endpoint to add a post to Supabase
app.post('/add_post', async (req: Request, res: Response): Promise<any> => {

    // Get post type from the request body
    const { rideType, user_id, tags, destination, description } = req.body;
    if (!rideType || !user_id || !tags || !destination || !description) {
        return res.status(400).json({ error: 'Bad Request: Insufficient data' });
    }

    try {
        const { data, error } = await supabase
            .from(`${rideType}_posts`)
            .insert([{ 
                "user_id": user_id, 
                "tags": tags, 
                "destination": destination, 
                "requestCount": 0, 
                "content": description
            }])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        res.status(201).json(data);
    } catch (error: any) {
        console.error('Error adding post to Supabase:', error.message);
        res.status(500).json({ error: 'Failed to add post', details: error.message });
    }
});

// Endpoint to fetch request posts from Supabase
app.get('/request_posts', async (req: Request, res: Response) => {
  try {
        const { data, error } = await supabase
        .from('request_posts')
        .select('*');

        if (error) {
        console.error('Supabase error:', error);
        throw error;
        }

        res.json(data);
    } catch (error: any) {
        console.error('Error fetching data from Supabase:', error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

// Endpoint to fetch offer posts from Supabase
app.get('/offer_posts', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('offer_posts')
            .select('*');
    
        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }
    
        res.json(data);
        } catch (error: any) {
        console.error('Error fetching data from Supabase:', error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});