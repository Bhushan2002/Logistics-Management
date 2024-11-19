import { formatNumberToIndianReadble, reverseDateString } from "./utils";

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

type Item = {
  title: string;
  accountName: string;
  amount: number;
  status: "CREDIT" | "DEBIT";
  date: string;
}

type BalanceSheetReportTemplateType = {
  from: string;
  to: string;
  user: User;
  totalCreditedAmount: number;
  totalDebitedAmount: number;
  items: Item[];
}

export function balanceSheetReportTemplate(data: BalanceSheetReportTemplateType) {
  const { from, to, user, totalCreditedAmount, totalDebitedAmount, items } = data;

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Balance Sheet Report</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"><style>:root{--body-font:"Inter",sans-serif}body{--bs-font-sans-serif:"Inter",sans-serif;--bs-body-font-family:var(--bs-font-sans-serif);--bs-body-font-size:0.6rem;--bs-body-font-weight:400;--bs-body-line-height:2;--bs-body-color:#41403e;--bs-primary:#0070e4;--bs-primary-rgb:0,112,228;--bs-border-color:#eeeeee}</style></head><body><section id="invoice"><div class="m-5"><div class="text-center"><img src="${user.companyDetails.companyLogo}" alt="${user.companyDetails.name}"></div><div class="text-center border-top border-bottom my-5 py-3"><h2 class="display-5 fw-bold">Balance Sheet</h2><div class="d-flex justify-content-between"><p class="m-0">From Date: ${reverseDateString(from)}</p><p class="m-0">To Date: ${reverseDateString(to)}</p></div></div><table class="table border my-5"><thead><tr class="bg-primary-subtle"><th scope="col">Sr. No.</th><th scope="col">Date</th><th scope="col">Title</th><th scope="col">A/C Name</th><th scope="col">Amount</th><th scope="col">Status</th></tr></thead><tbody>${items.map((item, index) => `<tr><th scope="row">${index + 1}</th><td>${reverseDateString(item.date)}</td><td>${item.title}</td><td>${item.accountName}</td><td>₹ ${formatNumberToIndianReadble(item.amount)}</td><td>${item.status}</td></tr>`).join("\n")}<tr><td colspan="3" class="">Total Credited Amount</td><td colspan="3" class="text-end">₹ ${formatNumberToIndianReadble(totalCreditedAmount)}</td></tr><tr><td colspan="3" class="">Total Debited Amount</td><td colspan="3" class="text-end">₹ ${formatNumberToIndianReadble(totalDebitedAmount)}</td></tr><tr><td colspan="3" class="text-primary fw-bold">Net Amount</td><td colspan="3" class="${totalCreditedAmount - totalDebitedAmount ? 'text-success' : 'text-danger'} ' fw-bold" style="text-align:right">₹ ${formatNumberToIndianReadble(totalCreditedAmount - totalDebitedAmount)}</td></tr></tbody></table><div class="d-flex justify-content-between my-5"><div><h5 class="fw-semibold mb-4">Contact Us</h5><ul class="list-unstyled"><li class="d-flex align-items-center mb-1"><iconify-icon class="social-icon text-primary fs-5 me-2" icon="mdi:location"></iconify-icon>${user.companyDetails.address}</li><li class="d-flex align-items-center mb-1"><iconify-icon class="social-icon text-primary fs-5 me-2" icon="solar:phone-bold"></iconify-icon>+91 ${user.companyDetails.phone}</li><li class="d-flex align-items-center mb-1"><iconify-icon class="social-icon text-primary fs-5 me-2" icon="ic:baseline-email"></iconify-icon>${user.companyDetails.email}</li></ul></div><div><ul class="list-unstyled"><li><img src="${user.personalDetails.sign}" class="me-2" style="max-width:200px" alt="Sign"></li><li class="text-center">${user.personalDetails.firstName} ${user.personalDetails.lastName}</li></ul></div></div><div id="footer-bottom"><div class="border-top"><div class="row mt-3"><div class="col-md-6 text-md-end"><p><a href="https://templatesjungle.com/" target="_blank" class="text-decoration-none text-black-50">TemplatesJungle</a></p></div></div></div></div></div></section><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script><script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script></body></html>` as string;
}