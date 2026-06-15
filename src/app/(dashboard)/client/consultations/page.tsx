"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2, Clock } from "lucide-react";
import Link from "next/link";

interface Consultation {
  id: string;
  appointmentDate: string;
  type: string | null;
  status: string;
  notes: string | null;
}

export default function ClientConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/consultations/client")
      .then((res) => res.json())
      .then((data) => setConsultations(data.consultations || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Consultations</h1>
          <p className="text-sm text-gray-500">View your consultation history and schedule</p>
        </div>
        <Button asChild className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800]">
          <Link href="/contact">Book New Consultation</Link>
        </Button>
      </div>

      {consultations.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-2">No consultations yet</p>
            <p className="text-sm text-gray-400 mb-4">Schedule your first consultation to get started.</p>
            <Button asChild className="bg-[#0B3AA8]">
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {consultations.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3AA8]/10">
                      <Calendar className="h-6 w-6 text-[#0B3AA8]" />
                    </div>
                    <div>
                      <p className="font-semibold">{c.type || "General Consultation"}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(c.appointmentDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge className={
                    c.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                    c.status === "COMPLETED" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }>
                    {c.status}
                  </Badge>
                </div>
                {c.notes && (
                  <p className="mt-4 text-sm text-gray-600 bg-gray-50 rounded p-3">{c.notes}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
