import FilePlayer from 'react-player'

export default function VideoPlayer() {
  return (
    <>
      <div className="hidden xl:block">
        <FilePlayer
          url="https://raw.githubusercontent.com/nicolasottone/web-analytics-tracker/7a1598fd08063ab0d26c1fd92c714ce3f325762b/public/video/democlip2.mp4"
          playing
          loop
          width={1080}
          height={920}
        />
      </div>
      <div className="hidden lg:block xl:hidden">
        <FilePlayer
          url="https://raw.githubusercontent.com/nicolasottone/web-analytics-tracker/7a1598fd08063ab0d26c1fd92c714ce3f325762b/public/video/democlip2.mp4"
          playing
          loop
          width={864}
          height={736}
        />
      </div>
      <div className="hidden md:block lg:hidden">
        <FilePlayer
          url="https://raw.githubusercontent.com/nicolasottone/web-analytics-tracker/7a1598fd08063ab0d26c1fd92c714ce3f325762b/public/video/democlip2.mp4"
          playing
          loop
          width={648}
          height={552}
        />
      </div>
      <div className="hidden sm:block md:hidden">
        <FilePlayer
          url="https://raw.githubusercontent.com/nicolasottone/web-analytics-tracker/7a1598fd08063ab0d26c1fd92c714ce3f325762b/public/video/democlip2.mp4"
          playing
          loop
          width={540}
          height={460}
        />
      </div>
    </>
  )
}
