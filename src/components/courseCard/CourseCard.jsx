import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CourseCard = ({ course, onInfoClick }) => {
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    // Tutor info (displayed subtly)
    const tutorAvatar = course.tutor?.avatar || '/images/default-avatar.png';
    const tutorFullName =
        course.tutor?.first_name && course.tutor?.last_name
            ? `${course.tutor.first_name} ${course.tutor.last_name}`
            : course.tutor?.username || 'Nieznany';
    const tutorUsername = course.tutor?.username || 'nieznany';

    return (
        <motion.div
            layoutId={`course-${course.id}`}
            className="w-80 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Course Banner */}
            {course.banner ? (
                <div className="w-full h-32 overflow-hidden">
                    <LazyLoadImage
                        src={course.banner}
                        alt="Course Banner"
                        effect="blur"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Brak bannera</span>
                </div>
            )}

            {/* Course Details */}
            <div className="p-4 flex-1">
                <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                <p className="mt-1 text-sm text-gray-700">{course.description}</p>
                <div className="mt-3 flex gap-2">
          <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
            {course.subject}
          </span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
            {course.level}
          </span>
                </div>
            </div>

            {/* Tutor Info & Action */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                        <LazyLoadImage
                            src={tutorAvatar}
                            alt={tutorUsername}
                            effect="blur"
                            className="object-cover w-full h-full"
                            afterLoad={() => setAvatarLoaded(true)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{tutorFullName}</span>
                        <span className="text-xs text-gray-500">@{tutorUsername}</span>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onInfoClick?.(course)}
                    className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
                >
                    Szczegóły
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CourseCard;
