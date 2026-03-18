import React from 'react';
import { Invoice } from '@types/index';
import { formatCurrency, formatDate } from '@utils/helpers';
import { CATEGORY_LABELS } from '@utils/constants';

interface InvoiceProps {
  invoice: Invoice | null;
  visible: boolean;
}

export const InvoiceComponent: React.FC<InvoiceProps> = ({ invoice, visible }) => {
  if (!visible || !invoice) return null;

  const colorMap: Record<string, string> = {
    vehicle: '#a78bfa',
    entry: '#fbbf24',
    room: '#34d399',
    freshup: '#22d3ee',
    meals: '#fb923c',
    entertainment: '#f472b6',
    extra: '#f87171',
  };

  const iconMap: Record<string, string> = {
    vehicle: '🚌',
    entry: '🎟️',
    room: '🏨',
    freshup: '🚿',
    meals: '🍽️',
    entertainment: '🎉',
    extra: '💼',
  };

  return (
    <div className="invoice-wrap active">
      <div className="inv-card">
        <div className="inv-hdr">
          <div className="inv-logo">✦ Joshy's Tour Planner · Tele-Caller Estimate</div>
          <div className="inv-title">Trip Cost Estimate</div>
          <div className="inv-ref">
            Ref: {invoice.ref} · Generated on {formatDate()}
          </div>
        </div>

        <div className="inv-meta">
          <div className="meta-box">
            <div className="meta-lbl">Institution</div>
            <div className="meta-val">{invoice.school || 'N/A'}</div>
          </div>
          <div className="meta-box">
            <div className="meta-lbl">Category</div>
            <div className="meta-val">
              {CATEGORY_LABELS[invoice.category] || invoice.category}
            </div>
          </div>
          <div className="meta-box">
            <div className="meta-lbl">Pax</div>
            <div className="meta-val">
              {invoice.students} Students + {invoice.staffs} Staffs
            </div>
          </div>
          <div className="meta-box">
            <div className="meta-lbl">Duration</div>
            <div className="meta-val">
              {invoice.days} Days / {invoice.nights} Nights
            </div>
          </div>
          <div className="meta-box">
            <div className="meta-lbl">Vehicle</div>
            <div className="meta-val">
              {invoice.numVehicles} × {invoice.vehicleType || 'Not Selected'}
            </div>
          </div>
          <div className="meta-box">
            <div className="meta-lbl">Enquiry Ref</div>
            <div className="meta-val">{invoice.ref}</div>
          </div>
        </div>

        <div className="divider"></div>

        {Object.entries(invoice.breakdown)
          .filter(([_, component]) => component.total > 0)
          .map(([key, component]) => (
            <div key={key} className="csec">
              <div
                className="csec-title"
                style={{ color: colorMap[key as keyof typeof colorMap] }}
              >
                {iconMap[key as keyof typeof iconMap]} {component.label}
              </div>
              {/* Render details based on type */}
              {component.details &&
                Array.isArray(component.details) &&
                component.details.map((detail: any, idx: number) => (
                  <div key={idx} className="crow">
                    <span className="cn">{renderDetailText(key, detail)}</span>
                    <span className="ca">{formatCurrency(detail.cost || detail.total)}</span>
                  </div>
                ))}
              <div className="crow subtot">
                <span>{component.label} Total</span>
                <span>{formatCurrency(component.total)}</span>
              </div>
            </div>
          ))}

        <div className="inv-total">
          <div className="tot-row">
            <span className="tot-lbl">Base Cost (All Components)</span>
            <span className="tot-val">{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="tot-row">
            <span className="tot-lbl">Profit Margin (20%)</span>
            <span className="tot-val" style={{ color: 'var(--amber)' }}>
              {formatCurrency(invoice.profit)}
            </span>
          </div>
          <div className="grand">
            <div className="tot-row">
              <span className="grand-lbl">Total Trip Cost</span>
              <span className="grand-val">{formatCurrency(invoice.grandTotal)}</span>
            </div>
          </div>
          <div className="perhead">
            Per Head Cost ÷ {invoice.students} students ={' '}
            <strong>{formatCurrency(invoice.perHead)}</strong>
          </div>
        </div>

        <div className="inv-foot">
          This is a preliminary estimate. Final pricing may vary based on availability and season.
          · Joshy's Tours & Travels
        </div>
      </div>
    </div>
  );
};

function renderDetailText(componentType: string, detail: any): React.ReactNode {
  switch (componentType) {
    case 'vehicle':
      return `Day ${detail.day} — ${detail.km} km travelled (${detail.extraKm} km extra + 80 km city)`;
    case 'entry':
      return (
        <>
          Day {detail.day} — {detail.location}
          <br />
          <small style={{ color: 'var(--txd)' }}>
            {/* Add student staffs info */}
          </small>
        </>
      );
    case 'room':
      return `Night ${detail.night} — ${detail.sharing}-Sharing × ${detail.rooms} rooms`;
    case 'freshup':
      return `Day ${detail.day} — ${detail.session}`;
    case 'meals':
      return `Day ${detail.day} — ${detail.meal} [${detail.type}]`;
    case 'entertainment':
      return `${detail.name}`;
    case 'extra':
      return `Day ${detail.day} — ${detail.name}`;
    default:
      return 'Item';
  }
}
