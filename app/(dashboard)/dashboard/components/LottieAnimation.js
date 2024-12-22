import Lottie from "lottie-react";

function MyLottieAnimation() {
  return (
    <div style={{ width: 500, height: 500 }}>
      <Lottie
        path="/business-team.json" // Adjusted for direct path
        loop
        autoplay
      />
    </div>
  );
}

export default MyLottieAnimation;
