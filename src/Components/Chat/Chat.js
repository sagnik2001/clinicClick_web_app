import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Moment from "react-moment";
import { FiCamera, FiMessageCircle, FiSend, FiUsers } from "react-icons/fi";
import DashboardLayout from "../../NewUpdates/Layouts/DashboardLayout";
import { api_url } from "../../Urls/Api";
import appli from "../../Database/Firebase";
import { EmptyState, SkeletonGrid } from "../common/LoadingStates";
import Conversations from "./Conversations/Conversations";
import "./chat.css";

const Chat = () => {
  const [conversation, setConversation] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [chatStarted, setChatStarted] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [chatid, setChatid] = useState(null);
  const [message, setmessage] = useState("");
  const [convo, setconvo] = useState([]);
  const [img, setImg] = useState("");
  const [previmg, setprevImg] = useState("");
  const scrollRef = useRef();
  const unsubscribeRef = useRef(null);
  const db = appli.firestore();
  const storage = appli.storage();

  const token = window.localStorage.getItem("token");
  const docId = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const currentUserId = docId?._id;

  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      setprevImg(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };

  const initChat = async (user) => {
    const userId = user?._id || user;
    setChatStarted(true);
    setSelectedPeer(user);
    setChatid(userId);

    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    const roomId = `${currentUserId}$${userId}`;
    const msgsRef = collection(db, "messages", roomId, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((snapDoc) => {
        msgs.push(snapDoc.data());
      });
      setconvo(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastmsg", roomId));
    if (docSnap.data() && docSnap.data().from !== currentUserId) {
      await updateDoc(doc(db, "lastmsg", roomId), { unread: false });
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo]);

  useEffect(() => () => unsubscribeRef.current?.(), []);

  const messageHandler = async (e) => {
    e.preventDefault();
    if (!message && !img) return;

    const roomId = `${currentUserId}$${chatid}`;
    let url;

    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
      const snap = await uploadBytes(imgRef, img);
      url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    }

    const payload = {
      message,
      from: currentUserId,
      to: chatid,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    };

    await addDoc(collection(db, "messages", roomId, "chat"), payload);
    await setDoc(doc(db, "lastmsg", roomId), {
      ...payload,
      unread: true,
    });

    setmessage("");
    setImg("");
    setprevImg("");
  };

  useEffect(() => {
    axios
      .get(`${api_url}doc/patients/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setConversation(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setContactsLoading(false));
  }, [token]);

  return (
    <DashboardLayout>
      <section className="care-page-header">
        <div>
          <span className="care-kicker">
            <FiMessageCircle /> Care chat
          </span>
          <h1>Patient conversations</h1>
          <p>Message registered mothers directly from the field-worker console.</p>
        </div>
      </section>

      <div className="messenger care-chat-shell">
        <aside className="chatMenu care-chat-sidebar">
          <div className="care-chat-sidebar__header">
            <span className="care-pill">
              <FiUsers /> Patients
            </span>
            <h2>Registered contacts</h2>
          </div>
          <div className="care-chat-list">
            {contactsLoading ? (
              <SkeletonGrid count={3} />
            ) : conversation.length > 0 ? (
              conversation.map((contact) => (
                <Conversations
                  conversation={contact}
                  active={chatid === contact?._id}
                  onClick={initChat}
                  key={contact?._id}
                />
              ))
            ) : (
              <EmptyState
                title="No patients to message"
                message="Registered mothers will appear here once records are linked to this worker."
              />
            )}
          </div>
        </aside>

        <section className="chatBox care-chat-panel">
          <div className="care-chat-panel__inner">
            {chatStarted ? (
              <>
                <div className="care-chat-panel__header">
                  <span className="care-chat-contact__avatar care-chat-contact__avatar--large">
                    {selectedPeer?.name?.charAt(0)?.toUpperCase() || "M"}
                  </span>
                  <div>
                    <h2>{selectedPeer?.name || "Mother record"}</h2>
                    <p>{selectedPeer?.phone || selectedPeer?.email || "Patient conversation"}</p>
                  </div>
                </div>

                <div className="chatBoxTop care-chat-messages">
                  {convo.map((item, index) => {
                    const isMine = item.from === currentUserId;
                    return (
                      <div
                        className={`care-chat-message-row ${
                          isMine ? "care-chat-message-row--mine" : ""
                        }`}
                        ref={scrollRef}
                        key={`${item.createdAt?.seconds || index}-${index}`}
                      >
                        {item?.media && (
                          <p
                            className={`care-chat-bubble ${
                              isMine ? "care-chat-bubble--mine" : ""
                            }`}
                          >
                            <img src={item.media} alt={item.message || "Attachment"} />
                          </p>
                        )}
                        {item?.message && (
                          <p
                            className={`care-chat-bubble ${
                              isMine ? "care-chat-bubble--mine" : ""
                            }`}
                          >
                            {item.message}
                          </p>
                        )}
                        <small className="care-chat-date">
                          {item.createdAt?.toDate ? (
                            <Moment fromNow>{item.createdAt.toDate()}</Moment>
                          ) : null}
                        </small>
                      </div>
                    );
                  })}
                </div>

                <div className="chatBoxBottom care-chat-composer">
                  <form onSubmit={messageHandler}>
                    <label htmlFor="doctor-chat-img" className="care-chat-upload">
                      {previmg ? (
                        <img src={previmg} alt="Selected attachment preview" />
                      ) : (
                        <FiCamera />
                      )}
                    </label>
                    <input
                      onChange={handleImage}
                      type="file"
                      id="doctor-chat-img"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <textarea
                      className="chatMessageInput"
                      value={message}
                      onChange={(e) => setmessage(e.target.value)}
                      placeholder="Write a message..."
                    />
                    <button className="chatSubmitButton" type="submit">
                      <FiSend /> Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <EmptyState
                title="Select a patient to start chatting"
                message="Choose a registered mother from the left panel to open the conversation thread."
              />
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
