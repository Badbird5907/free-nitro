"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className={"text-4xl font-bold"}>Nitro Link Generator</h1>
      <h2 className={"text-2xl text-gray-500"}>This is so sketchy lmao</h2>
      <Button color={"primary"} isLoading={loading} onPress={async (e) => {
        setLoading(true);
        try {
          const res = await axios.get("/api/generate");
          setLoading(false);
          const link = res.data as string;
          Swal.fire({
            title: "Success!",
            icon: "success",
            html: `<p style="color: white;">${link}</p>`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Open",
            cancelButtonText: "Close",
            denyButtonText: `Copy Link`,
            denyButtonColor: "#3085d6",
          }).then((result) => {
            if (result.isConfirmed){
              window.open(link, "_blank");
            } else if (result.isDenied){
              navigator.clipboard.writeText(link);
            }
          });
        } catch (e: any) {
          setLoading(false);
          Swal.fire({
            html: `<p style="color: white;">What the fuck...</br>${e.response.status} | ${e.response.data}</p>`,
            icon: "error",
            title: "Error!",
          });
        }
      }}>Generate Nitro</Button>
    </section>
  );
}
