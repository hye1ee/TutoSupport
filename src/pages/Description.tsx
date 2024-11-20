import styled from "styled-components";

export default function Description() {
  return (
    <PageWrapper>
      <h1>TutoSupport</h1>
      <span>Description will be here</span>
      <h2>Features</h2>
      <div>1. Comments</div>
      <div>2. Gallery</div>
      <div>3. Encouragement Alert</div>
      <div>4. Feedback comment encouragement</div>

      <h2>Core Tasks</h2>
      <div>1. Finding inspiration from different users’ works. </div>
      <div>1. Recognizing and overcoming mistakes from your work. </div>
      <div>1. Giving other people feedback. </div>
      <div>1. Share your work at multiple stages and get encouragement. </div>
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

  gap: 8px;

  box-sizing: border-box;
  padding: 30px 80px;
  margin-top: 15px;

  font-size: 22px;

  color: white;

  background-color: #584a54;
  overflow-y: auto;
`;
