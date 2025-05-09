import { createAsyncThunk } from '@reduxjs/toolkit';
import { courseService } from '../../api/services/courseService';

export const fetchUserCourses = createAsyncThunk(
    'courses/fetchUserCourses',
    async (userID, { rejectWithValue }) => {
        try {
            const response = await courseService.getCoursesForUser(userID);
            return response.data; // Assumes your API returns an array of course DTOs.
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch courses for user'
            );
        }
    }
);
export const enrollCourse = createAsyncThunk(
    'courses/enrollCourse',
    async (courseID, { rejectWithValue }) => {
        try {
            const response = await courseService.enrollCourse(courseID);
            return response.data; // Assumes API returns the updated course DTO
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to enroll in course'
            );
        }
    }
);
