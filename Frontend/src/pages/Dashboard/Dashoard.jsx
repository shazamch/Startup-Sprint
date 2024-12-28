import React, { useEffect, useState } from 'react';
import PostCard from '../../elements/postCard/PostCard';
import postMiddleware from '../../redux/middleware/postMiddleware';
import { useDispatch } from 'react-redux';
import PostInput from '../../components/dashboard/PostInput';

function Dashboard() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await dispatch(postMiddleware.GetAllPosts());
        if (response.success) {
          setPosts(response.data);
        } else {
          console.error("Error fetching posts:", response.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);
  
  return (
    <div className='rounded-lg border bg-blue-50 dark:bg-yellow-100'>
    <div className="flex m-1 mb-3">
      <PostInput/>
      </div>
    <div className="flex flex-col gap-6 h-[calc(100vh-180px)] overflow-auto">
      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : (
        <div className="space-y-4 mx-4">
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                userName={post.user.name || "User"}
                userPhoto={post.user.profilephoto}
                postPhoto={post.postphoto}
                postText={post.posttext || ''}
                initialLikeCount={post.likecount|| 0}
                liked={post.liked || false}
                postdt={String(post.updatedAt)}
                startupName={post.startupName}
                startupID={post.startupID}
              />
            ))
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default Dashboard;
