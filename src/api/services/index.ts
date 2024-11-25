import axios from 'axios';
import { TodoService } from './Todo.service';

const instance = axios.create({
    baseURL: 'https://krjtzipafygiuaerygnu.supabase.co/rest/v1',
    headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyanR6aXBhZnlnaXVhZXJ5Z251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MTAzMzUsImV4cCI6MjA0NjA4NjMzNX0.OfvmxqrNizqanrBNA3iG6oHdC-pj8kt0ARkzyM_2aiw',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyanR6aXBhZnlnaXVhZXJ5Z251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MTAzMzUsImV4cCI6MjA0NjA4NjMzNX0.OfvmxqrNizqanrBNA3iG6oHdC-pj8kt0ARkzyM_2aiw`,
        'Content-Type': 'application/json',
    },
});

export const TodoService = new TodoService(instance);
