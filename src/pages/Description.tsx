import styled from "styled-components";

export default function Description() {
  return (
    <PageWrapper>
      <h1>TutoSupport</h1>
      <div>
        is a social system of video tutorials for hands-on tasks that enables
        users to{"  "}
        <span style={{ color: "#C0D5F4" }}>
          easily receive personalized inspiration and feedback
        </span>
        {"  "}
        while following the tutorials.
      </div>
      <h2>Features</h2>
      <div style={{ fontWeight: 700, marginTop: "6px" }}>1. 💬 Comments</div>
      <div style={{ fontSize: "18px" }}>
        categorized per each <span style={{ color: "#C0D5F4" }}>section</span>.
        Users can tag{" "}
        <span style={{ color: "#C0D5F4" }}>(#tip, #mistakes, #questions) </span>
        their comments to quickly find or leave feedback. Users can use the{" "}
        <span style={{ color: "#C0D5F4" }}>clap </span>
        feature to show agreement or appreciation for others' comments. Comments
        tagged as #mistake with many claps are featured on the{" "}
        <span style={{ color: "#C0D5F4" }}>common mistakes </span>
        board for that section.
      </div>
      <div style={{ fontWeight: 700, marginTop: "6px" }}>2. 🖼️ Gallery</div>
      <div style={{ fontSize: "18px" }}>
        where users can share{" "}
        <span style={{ color: "#C0D5F4" }}>
          photos of their work process or completed{" "}
        </span>{" "}
        projects. Users can use the{" "}
        <span style={{ color: "#C0D5F4" }}>clap </span> feature to compliment
        and encourage others' photos. Photos with the most claps are featured on
        the <span style={{ color: "#C0D5F4" }}>hall of fame board.</span>
      </div>
      <div style={{ fontWeight: 700, marginTop: "6px" }}>
        3. 🥳 Encouragement Alert
      </div>
      <div style={{ fontSize: "18px" }}>
        When a user's gallery photo receives claps, they are notified with an
        encouragement message.
      </div>
      <div style={{ fontWeight: 700, marginTop: "6px" }}>
        4. 📩 Feedback comment encouragement
      </div>
      <div style={{ fontSize: "18px" }}>
        When users move to a new section, feedback-needed comments from the
        previous section are recommended.
      </div>
      <h2>Core Tasks</h2>
      <div>1. 💡 Finding inspiration from different users’ works. </div>
      <div>2. 🧐 Recognizing and overcoming mistakes from your work. </div>
      <div>3. 🗣️ Giving other people feedback. </div>
      <div>
        4. 📸 Share your work at multiple stages and get encouragement.{" "}
      </div>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  /* gap: 4px; */

  box-sizing: border-box;
  padding: 30px 80px;
  margin-top: 15px;

  font-size: 22px;

  color: white;

  background-color: #584a54;
  overflow-y: auto;
`;
