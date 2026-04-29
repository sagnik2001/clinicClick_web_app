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
import { useLocation } from "react-router-dom";
import { FiCamera, FiMessageCircle, FiSend, FiUsers } from "react-icons/fi";
import { api_url } from "../../Urls/Api";
import appli from "../../Database/Firebase";
import { DashboardTopBar } from "../../Components/common/CareShell";
import { EmptyState, SkeletonGrid } from "../../Components/common/LoadingStates";
import { useAuth } from "../../Context/AuthContext";
import Conversations from "../../Components/Chat/Conversations/Conversations";
import "../../Components/Chat/chat.css";

const patientLinks = [
  { name: "Dashboard", href: "/patientdashboard" },
  { name: "Care team", href: "/doctors" },
  { name: "Appointments", href: "/patientappointment" },
  { name: "Profile", href: "/patientdetailForm" },
];

const Chatting = () => {
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
  const location = useLocation();
  const { signOutPatient } = useAuth();

  const token = window.localStorage.getItem("patientToken");
  const docId = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const currentUserId = docId?.patientid;

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

    const roomId = `${userId}$${currentUserId}`;
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
    if (docSnap.data() && docSnap.data().from !== userId) {
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

    const roomId = `${chatid}$${currentUserId}`;
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
      .get(`${api_url}patient/getdo/`, {
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
    <main className="care-patient-dashboard">
      <DashboardTopBar
        links={patientLinks}
        activePath={location.pathname}
        onLogout={signOutPatient}
        roleLabel="Mother"
      />
      <section className="care-dashboard-main">
        <section className="care-page-header">
          <div>
            <span className="care-kicker">
              <FiMessageCircle /> Care chat
            </span>
            <h1>Care team messages</h1>
            <p>Message subscribed doctors and health workers from one place.</p>
          </div>
        </section>

        <div className="messenger care-chat-shell">
          <aside className="chatMenu care-chat-sidebar">
            <div className="care-chat-sidebar__header">
              <span className="care-pill">
                <FiUsers /> Care team
              </span>
              <h2>Available contacts</h2>
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
                  title="No care contacts"
                  message="Subscribed care providers will appear here."
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
                      {selectedPeer?.name?.charAt(0)?.toUpperCase() || "D"}
                    </span>
                    <div>
                      <h2>{selectedPeer?.name || "Care provider"}</h2>
                      <p>{selectedPeer?.hospital || selectedPeer?.email || "Care conversation"}</p>
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
                      <label htmlFor="patient-chat-img" className="care-chat-upload">
                        {previmg ? (
                          <img src={previmg} alt="Selected attachment preview" />
                        ) : (
                          <FiCamera />
                        )}
                      </label>
                      <input
                        onChange={handleImage}
                        type="file"
                        id="patient-chat-img"
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
                  title="Select a contact to start chatting"
                  message="Choose a care provider from the left panel to open the conversation thread."
                />
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Chatting;
