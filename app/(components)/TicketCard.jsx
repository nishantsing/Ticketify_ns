import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import Link from "next/link";

const TicketCard = ({ ticket }) => {
  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString(userLocale, options);

    return formattedDate;
  }

  const createdDateTime = formatTimestamp(ticket.createdAt);
  const updatedDateTime = formatTimestamp(ticket.updatedAt);

  return (
    <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
      <div
        className={`flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2 cursor-pointer ${
          ticket.status === "done" ? "bg-green-700" : ""
        } ${ticket.priority > 4 ? "bg-red-500" : ""} ${
          ticket.status === "started" ? "bg-slate-700" : ""
        }`}
      >
        <div className="flex mb-3">
          <PriorityDisplay priority={ticket.priority} />
        </div>
        <h4 className="mb-1">{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2 " />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1"><b>Created At:</b> {createdDateTime}</p>
            <p className="text-xs my-1"><b>Last Updated At:</b> {updatedDateTime}</p>
            {ticket.status === "done" ? "" : <ProgressDisplay progress={ticket.progress} />}
          </div>
        </div>
        <hr className="h-px border-0 bg-page my-2" />
        <h6 className="mb-1 capitalize">{ticket.status}</h6>
      </div>
    </Link>
  );

};

export default TicketCard;
