"use client";
export default function Hero2() {
  return (
    <div className="w-full h-full object-cover">
      <video
        className="w-full h-full object-cover gradient-mask-b-60"
        autoPlay
        muted
      >
        <source
          src="https://csi-forms.s3.ap-south-1.amazonaws.com/03.webm"
          type="video/webm"
        />
      </video>
      <div className="mask-gradient" />
      {/* <img src={svg} alt="something" /> */}
    </div>
  );
}
