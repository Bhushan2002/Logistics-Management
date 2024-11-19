import { formatNumberToIndianReadble, reverseDateString, uppercaseFirstCharacter } from "./utils";

type User = {
  personalDetails: {
    salutation: "mr" | "mrs" | "ms";
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    sign?: string;
  };
  companyDetails: {
    name: string;
    address: string;
    phone: string;
    email: string;
    gstNumber: string;
    companyLogo?: string;
  };
};

type InvoiceDetails = {
  invoiceId?: number;
  date: string;
  billFrom: {
    salutation: string;
    name: string;
    address: string;
    phone: string;
  };
  billTo: {
    salutation: string;
    name: string;
    address: string;
    phone: string;
  };
  subTotal: number;
  gstPercentage: number;
  gstAmount: number;
  totalAdvanceAmount: number;
  grandTotal: number;
  items?: {
    vehicleNumber: string;
    date: string;
    from: string;
    to: string;
    lrNumber: string;
    units: number;
    rate: number;
    total: number;
    detention: number;
    grandTotal: number;
    advance: number;
  }[];
  note?: string;
};

type InvoiceTemplateType = {
  user: User;
  invoice: InvoiceDetails;
}

export function invoiceTemplate(data: InvoiceTemplateType) {
  const { user, invoice } = data;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Invoice</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"><style>:root{--body-font:"Inter",sans-serif}body{--bs-font-sans-serif:"Inter",sans-serif;--bs-body-font-family:var(--bs-font-sans-serif);--bs-body-font-size:0.6rem;--bs-body-font-weight:400;--bs-body-line-height:2;--bs-body-color:#41403e;--bs-primary:#0070e4;--bs-primary-rgb:0,112,228;--bs-border-color:#eeeeee}</style></head><body><section id="invoice"><div class="m-5"><div class="text-center border-top border-bottom my-3 py-3"><h2 class="display-5 fw-bold">INVOICE</h2><p class="m-0">Invoice No: #${invoice.invoiceId?.toString().padStart(6, "0")}</p><p class="m-0">Invoice Date: ${reverseDateString(invoice.date)}</p><p class="m-0">GST No: ${user.companyDetails.gstNumber}</p></div><div class="d-flex justify-content-between"><div><p class="text-primary">Bill From</p><h6>${uppercaseFirstCharacter(invoice.billFrom.salutation)} ${invoice.billFrom.name}</h6><ul class="list-unstyled"><li>+91 ${invoice.billFrom.phone}</li><li>${invoice.billFrom.address}</li></ul></div><div class="text-end"><p class="text-primary">Bill To</p><h6>${uppercaseFirstCharacter(invoice.billTo.salutation)} ${invoice.billTo.name}</h6><ul class="list-unstyled"><li>+91 ${invoice.billTo.phone}</li><li>${invoice.billTo.address}</li></ul></div></div><table class="table border my-3"><thead><tr class="bg-primary-subtle"><th scope="col">Sr. No.</th><th scope="col">Vehicle No.</th><th scope="col">Date</th><th scope="col">From</th><th scope="col">To</th><th scope="col">Lr. No.</th><th scope="col">Units</th><th scope="col">Rate</th><th scope="col">Total</th><th scope="col">Detention</th><th scope="col">Grand Total</th><th scope="col">Advance</th></tr></thead><tbody>${invoice.items?.map((item, index) => `<tr><td scope="row" class="fw-semibold">${index + 1}</td><td class="fw-semibold">${item.vehicleNumber}</td><td class="fw-semibold">${reverseDateString(item.date)}</td><td class="fw-semibold">${item.from}</td><td class="fw-semibold">${item.to}</td><td class="fw-semibold">${item.lrNumber}</td><td class="fw-semibold">${item.units}</td><td class="fw-semibold">${formatNumberToIndianReadble(item.rate)}</td><td class="fw-semibold">${formatNumberToIndianReadble(item.total)}</td><td class="fw-semibold">${formatNumberToIndianReadble(item.detention)}</td><td class="fw-semibold">${formatNumberToIndianReadble(item.grandTotal)}</td><td class="fw-semibold">${formatNumberToIndianReadble(item.advance)}</td></tr>`).join("\n")}<tr><td colspan="2" class="">Sub-Total</td><td colspan="10" class="text-end">₹ ${formatNumberToIndianReadble(invoice.subTotal)}</td></tr><tr><td colspan="2" class="">GST (%)</td><td colspan="10" class="text-end">${invoice.gstPercentage}%</td></tr><tr><td colspan="2" class="">GST Amount</td><td colspan="10" class="text-end">₹ ${formatNumberToIndianReadble(invoice.gstAmount)}</td></tr><tr><td colspan="2" class="">Basic Amount</td><td colspan="10" class="text-end">₹ ${formatNumberToIndianReadble(invoice.subTotal - invoice.gstAmount)}</td></tr><tr><td colspan="2" class="">Total Advance</td><td colspan="10" class="text-end">₹ ${formatNumberToIndianReadble(invoice.totalAdvanceAmount)}</td></tr><tr><td colspan="2" class="text-primary fw-bold">Grand Total</td><td colspan="10" class="text-primary fw-bold text-end">₹ ${formatNumberToIndianReadble(invoice.grandTotal)}</td></tr></tbody></table><div class=""><p class="text-muted">Note:<span>${invoice?.note ?? ""}</span></p></div><div class="d-flex justify-content-between my-5"><div><h6 class="fw-semibold mb-4">Contact Us</h6><ul class="list-unstyled"><li class="d-flex align-items-center mb-1"><iconify-icon class="social-icon text-primary fs-5 me-2" icon="mdi:location"></iconify-icon>${user.companyDetails.address}</li><li class="d-flex align-items-center mb-1"><iconify-icon class="social-icon text-primary fs-5 me-2" icon="solar:phone-bold"></iconify-icon>+91 ${user.companyDetails.phone}</li><li class="d-flex align-items-center mb-1"><iconify-icon class="social-icon text-primary fs-5 me-2" icon="ic:baseline-email"></iconify-icon>${user.companyDetails.email}</li></ul></div><div><h6 class="fw-semibold mb-4 text-end">Signature</h6><ul class="list-unstyled"><li><div class="me-2" style="width:200px;height:150px"></div></li><li class="text-center">${user.personalDetails.firstName} ${user.personalDetails.lastName}</li></ul></div></div><div id="footer-bottom"><div class="border-top"><div class="row mt-3"><div class="col-md-6 text-md-end"><p><a href="https://templatesjungle.com/" target="_blank" class="text-decoration-none text-black-50">TemplatesJungle</a></p></div></div></div></div></div></section><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script><script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script></body></html>` as string;
}