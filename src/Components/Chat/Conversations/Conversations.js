import React from "react";
import dummy from "../../assets/upload2.png";

const Conversations = ({ conversation, active, onClick }) => {
  const name = conversation?.name || "Care contact";
  const subtitle =
    conversation?.trimester ||
    conversation?.specialization ||
    conversation?.hospital ||
    conversation?.city ||
    "Tap to open chat";

  return (
    <button
      type="button"
      className={`care-chat-contact ${active ? "care-chat-contact--active" : ""}`}
      onClick={() => onClick(conversation)}
    >
      <span className="care-chat-contact__avatar">
        {conversation?.profilePicture ? (
          <img src={conversation.profilePicture} alt={name} />
        ) : (
          <img src={dummy} alt="" />
        )}
      </span>
      <span className="care-chat-contact__body">
        <strong>{name}</strong>
        <span>{subtitle}</span>
      </span>
    </button>
  );
};

export default Conversations;
