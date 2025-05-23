import { useState } from 'react';
import { Play, Youtube, Music, Film, Clapperboard } from 'lucide-react';
import TrailerModal from './trailerModal';

// Helper function to extract YouTube ID from URL
const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Video type configuration
const VIDEO_TYPES = [
  {
    name: 'promo',
    label: 'Promotional Videos',
    icon: <Clapperboard className="h-4 w-4" />,
    getVideo: (video) => video.trailer
  },
  {
    name: 'episodes',
    label: 'Episode Previews',
    icon: <Film className="h-4 w-4" />,
    getVideo: (video) => video
  },
  {
    name: 'music_videos',
    label: 'Music Videos',
    icon: <Music className="h-4 w-4" />,
    getVideo: (video) => video.video
  }
];

export default function TrailerSection({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check if we have any videos at all
  const hasVideos = VIDEO_TYPES.some(type => 
    videos?.data?.[type.name]?.length > 0
  );

  if (!hasVideos) {
    return (
      <div className="mt-12">
        <h2 className="mb-6 border-b border-gray-700 pb-2 text-2xl font-bold text-white">
          Videos & Trailers
        </h2>
        <p className="text-gray-400">No videos available for this anime</p>
      </div>
    );
  }

  // Get all videos flattened for featured video selection
  const allVideos = VIDEO_TYPES.flatMap(type => 
    videos.data?.[type.name]?.map(video => ({
      ...type.getVideo(video),
      meta: {
        title: video.title,
        author: video.meta?.author,
        type: type.label
      }
    })).filter(Boolean)
  );

  // Select the first video as featured
  const featuredVideo = allVideos[0];

  return (
    <div className="mt-12">
      <h2 className="mb-6 border-b border-gray-700 pb-2 text-2xl font-bold text-white">
        Videos & Trailers
      </h2>

      {/* Featured Video Section */}
      {featuredVideo && (
        <div className="mb-10">
          <div
            className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-gray-800"
            onClick={() => {
              setSelectedVideo(featuredVideo);
              setShowModal(true);
            }}
          >
            <img
              src={
                featuredVideo.images?.maximum_image_url ||
                `https://img.youtube.com/vi/${getYoutubeId(featuredVideo.url)}/maxresdefault.jpg`
              }
              alt={featuredVideo.meta.title || 'Featured video'}
              className="h-full w-full rounded-lg object-cover opacity-70 transition-opacity group-hover:opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-red-600 p-4 transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <p className="font-medium text-white">
                {featuredVideo.meta.title || 'Featured Video'}
              </p>
              <div className="mt-1 flex items-center">
                <Youtube className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-300">
                  {featuredVideo.meta.type || 'Watch Now'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Categories */}
      {VIDEO_TYPES.map((type) => {
        const typeVideos = videos.data?.[type.name];
        if (!typeVideos?.length) return null;

        return (
          <VideoCategory
            key={type.name}
            title={type.label}
            videos={typeVideos}
            getVideo={type.getVideo}
            icon={type.icon}
            onSelect={(video) => {
              setSelectedVideo({
                ...video,
                meta: {
                  title: typeVideos.find(v => type.getVideo(v) === video)?.title,
                  author: typeVideos.find(v => type.getVideo(v) === video)?.meta?.author,
                  type: type.label
                }
              });
              setShowModal(true);
            }}
          />
        );
      })}

      <TrailerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        videoUrl={selectedVideo?.url || selectedVideo?.embed_url}
        videoTitle={selectedVideo?.meta?.title}
        videoType={selectedVideo?.meta?.type}
        videoAuthor={selectedVideo?.meta?.author}
      />
    </div>
  );
}

function VideoCategory({ title, videos, getVideo, icon, onSelect }) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
        {icon}
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {videos.map((video, index) => {
          const videoData = getVideo(video);
          if (!videoData) return null;

          return (
            <div
              key={videoData.youtube_id || index}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-800"
              onClick={() => onSelect(videoData)}
            >
              <img
                src={
                  videoData.images?.medium_image_url ||
                  `https://img.youtube.com/vi/${getYoutubeId(videoData.url)}/mqdefault.jpg`
                }
                alt={video.title || `${title} ${index + 1}`}
                className="h-full w-full rounded-lg object-cover opacity-70 transition-opacity group-hover:opacity-50"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3">
                <p className="line-clamp-2 text-sm text-white">
                  {video.title || title}
                </p>
                {video.meta?.author && (
                  <p className="mt-1 text-xs text-gray-400">
                    {video.meta.author}
                  </p>
                )}
              </div>
              <div className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5">
                <Play className="h-3 w-3 text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}