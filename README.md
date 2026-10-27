# HerbTrace – Blockchain-Based Geo-Tagged Traceability of Ayurvedic Herbs

> **Trace the Journey. Verify the Source. Trust the Product.**
> A complete MERN & Ethereum full-stack provenance platform connecting wild organic herb harvesters, pharmaceutical processors, accredited quality laboratories, and consumers.

---

## 1. Project Title & Overview
**HerbTrace** is a production-grade full-stack web and decentralized application (DApp) designed to eliminate Ayurvedic adulteration, mislabeling, and counterfeit herbal products. By binding physical GPS coordinates from device hardware at the point of harvest with cryptographic SHA-256 proofs minted onto an Ethereum Solidity smart contract (`HerbTraceability.sol`), HerbTrace guarantees unalterable transparency from Western Ghats harvesters to consumer packaging QR verification.

---

## 2. Problem Statement
The Ayurvedic and herbal medicine industry suffers from critical vulnerabilities:
1. **Adulteration & Species Substitution:** High-demand herbs (e.g., *Withania somnifera* / Ashwagandha) are frequently diluted with low-potency leaves or synthetic compounds.
2. **Untracked Wild Foraging:** Over 70% of medicinal herbs are gathered from wild forests without verifiable geographic origin, leading to over-exploitation or toxic contamination from polluted regions.
3. **Paper Certificate Fraud:** Traditional physical laboratory certificates of analysis (CoA) are easily forged, edited, or reused across unrelated batches.
4. **Consumer Distrust:** Consumers have no reliable method to verify whether a package actually contains authentic, clean-tested Ayurvedic medicine.

---

## 3. Proposed Solution
HerbTrace introduces an end-to-end multi-tier traceability architecture:
- **Geo-Tagging at Collection:** Wild harvesters capture exact latitude and longitude coordinates with interactive Leaflet OpenStreetMap confirmation.
- **Sequential Multi-Tier Verification:** Admin approval → Industrial processing documentation (Cleaning, Drying, Grinding) → High-precision laboratory assays (HPLC Purity %, Moisture %, ICP-MS Heavy Metals, Microbial, Pesticide).
- **Cryptographic Hash Immutability:** Deterministic canonical JSON hashing (SHA-256) committed to the Ethereum blockchain ledger via `HerbTraceability.sol`.
- **Dynamic Packaging QR Code:** High-density QR containing the verification URL and Batch ID.
- **Instant Tamper Detection (Test Case 2):** Scans recalculate real-time hashes against the blockchain ledger; any unauthorized database modification immediately flags a red warning.
- **Batch-Grounded Botanical Chatbot:** Interactive assistant answering questions grounded in the current batch's provenance record.
- **Customer Dispute & Demo Warranty Refund (Test Case 3):** Built-in ticketing with automated demo refund settlements (e.g., `REF-2026-001` for ₹499).

---

## 4. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, React Router 7, Leaflet, OpenStreetMap, Tailwind CSS, Lucide Icons, Html5-Qrcode |
| **Backend** | Node.js, Express.js, TypeScript, JWT (JSON Web Tokens), bcryptjs, Multer, Nodemailer, Ethers.js v6 |
| **Database** | MongoDB & Mongoose schemas with built-in persistent JSON fallback store |
| **Blockchain** | Solidity `^0.8.20`, Hardhat, Ethers.js, `HerbTraceability.sol` smart contract |
| **Packaging & QR** | Qrcode node engine, Canvas-based optical scanner |

---

## 5. Three Primary User Roles

1. **COLLECTOR / WILD HARVESTER (`collector`)**
   - Access: Dedicated Collector Dashboard.
   - Capabilities: Logs new herb collections, enters botanical name, harvest weight, collection method, captures browser GPS geolocation, views interactive Leaflet map, tracks batch statuses.
   - Constraint: Cannot edit batches once approved by Admin. Cannot access admin or lab controls.

2. **SYSTEM ADMINISTRATOR (`admin`)**
   - Access: Comprehensive Admin Console.
   - Capabilities: Inspects pending batches with GPS coordinates, approves/rejects batches (with mandatory rejection reasons), logs industrial processing stages, records laboratory assay results (Purity %, Heavy Metals, Microbial), commits hashes to Ethereum smart contract, packages products, generates/downloads QR codes, and resolves customer complaints with demo refunds.

3. **CONSUMER / BUYER (`customer`)**
   - Access: Customer Portal, Camera QR Scanner, Public Verification Engine.
   - Capabilities: Scans product packaging, verifies on-chain cryptographic proofs, inspects harvest GPS markers on OpenStreetMap, queries the batch-grounded chatbot, submits quality discrepancy complaints, and tracks refund settlements.

---

## 6. End-to-End Traceability Flow

```
Farmer / Wild Harvester (GPS Geo-Tagging)
       ↓
Herb Collection & Batch ID Generation (e.g. HERB-2026-001)
       ↓
Administrator Inspection & Approval
       ↓
Industrial Processing (Cleaning → Drying → Cryo-Grinding)
       ↓
Quality & Laboratory Assays (HPLC Purity %, ICP-MS Heavy Metals, Microbial, Pesticide)
       ↓
Deterministic SHA-256 Hash Generation
       ↓
Smart Contract Ledger Registration (HerbTraceability.sol)
       ↓
Dynamic Packaging QR Code Generation
       ↓
Customer Scans Packaging QR Code
       ↓
Real-Time Verification: Current Database Hash == On-Chain Ledger Hash?
  ├─ [MATCH]   → ✓ Product Verified · Blockchain Verified · No Tampering
  └─ [MISMATCH]→ ⚠ Verification Failed · Data Mismatch Detected · Possible Tampering
```

---

## 7. Smart Contract Architecture

### `HerbTraceability.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HerbTraceability {
    struct BatchRecord {
        string batchId;
        string dataHash;
        uint256 timestamp;
        address uploadedBy;
    }

    mapping(string => BatchRecord) public batches;
    string[] public registeredBatchIds;
    address public owner;

    event BatchRegistered(
        string indexed batchId,
        string dataHash,
        uint256 timestamp,
        address indexed uploadedBy
    );

    function registerBatch(string memory batchId, string memory dataHash) public;
    function getBatch(string memory batchId) public view returns (...);
    function isBatchRegistered(string memory batchId) public view returns (bool);
    function getTotalBatches() public view returns (uint256);
}
```

### Deterministic JSON & SHA-256 Hashing
To prevent non-deterministic JSON key orders:
```json
{
  "batchId": "HERB-2026-001",
  "botanicalName": "Withania somnifera",
  "collectionDate": "2026-09-05",
  "dispatchDate": "2026-09-17",
  "expiryDate": "2028-09-14",
  "herbName": "Ashwagandha",
  "labResult": "PASS",
  "latitude": "11.0168",
  "longitude": "76.9558",
  "manufacturingDate": "2026-09-15",
  "processingDate": "2026-09-10",
  "quantity": "100"
}
```
SHA-256 is generated directly over this canonical string and recorded on Ethereum.

---

## 8. Pre-Seeded Demonstration Accounts

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin** | System Admin | `admin@herbtrace.demo` | `HerbTrace@2026` |
| **Collector** | Ravi Kumar | `collector@herbtrace.demo` | `HerbTrace@2026` |
| **Customer** | Demo Customer | `customer@herbtrace.demo` | `HerbTrace@2026` |

*Note: 1-click quick-login buttons are also available on the `/login` page.*

---

## 9. Three Required Demonstration Test Cases

### TEST CASE 1: Valid QR Verification
1. Navigate to `/verify/HERB-2026-001` or scan the Ashwagandha packaging QR code.
2. The server compares the deterministic hash against the on-chain record.
3. **Result:**
   - ✓ Product Verified
   - ✓ Blockchain Verified
   - ✓ No Tampering Detected
   - Displays Leaflet map centered on Coimbatore, Tamil Nadu (11.0168, 76.9558), hydro-sonic cleaning logs, and 98.4% lab purity assay.

### TEST CASE 2: Blockchain Tampering Detection (Fraud Prevention)
1. On the verification page `/verify/HERB-2026-001` (or in the Admin Blockchain tab), click **"🧪 Simulate Adulteration / Tamper"**.
2. The database purity value is modified from **98.4% to 85.2%**.
3. When verification re-runs, the newly generated SHA-256 hash diverges from the immutable hash stored on Ethereum.
4. **Result:**
   - ⚠ Verification Failed
   - ⚠ Data Mismatch Detected
   - ⚠ Possible Tampering
5. Click **"Restore Genuine Record"** to return the ledger to 100% verified status.

### TEST CASE 3: Mislabel Complaint + Refund Flow
1. Visit `/complaint?batchId=HERB-2026-001` (or click "Report Issue" from the product page).
2. Submit a complaint selecting **"Incorrect Label"** with description: *"Packaging expiry printed 2027 instead of verified 2028 ledger date."*
3. Log in as Admin (`admin@herbtrace.demo`), navigate to the **Complaints & Refunds** tab.
4. Review ticket `CMP-2026-001`, enter investigation notes, and click **"Approve & Refund ₹499"**.
5. Switch to Customer view (`customer@herbtrace.demo`): The complaint is marked **RESOLVED**, displaying Refund ID **`REF-2026-001`** for **₹499**.

---

## 10. Installation & Run Guide

### Prerequisites
- Node.js 22.12+
- npm $\ge 9$
- (Optional) MongoDB local or MongoDB Atlas connection string in `.env`
- (Optional) Local Hardhat node or Sepolia testnet RPC

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file from `.env.example`:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=replace-with-a-long-random-secret
MONGO_URI=mongodb://localhost:27017/herbtrace
# Set this to your deployed HTTPS URL so generated QR codes work on customer phones.
PUBLIC_APP_URL=https://your-deployed-domain.example
```

### 3. Start Full-Stack Server
```bash
npm run dev
```
The server will start Express, attach Vite development middlewares, auto-seed the demo accounts, batches, lab tests, and blockchain records, and listen on **`http://localhost:3000`**.

For real Ethereum verification, deploy `HerbTraceability.sol` and configure `BLOCKCHAIN_RPC_URL`, `CONTRACT_ADDRESS`, and `PRIVATE_KEY`. Without those settings, the app uses its local file-backed demo ledger and labels verification as simulated.

## 11. Deploying to Vercel

The Vercel configuration builds the Vite frontend as a static site and routes `/api/*` requests through the Express serverless function in `api/index.ts`.

1. Push this project to a GitHub repository, then import that repository into Vercel.
2. Keep the project root as the root directory. `vercel.json` supplies the build command, output directory, API routing, and SPA fallback.
3. In Vercel project settings, add `JWT_SECRET` with a newly generated, long random value. Do not use the example or demo secret for a public deployment.
4. Deploy. Set `PUBLIC_APP_URL` to the final HTTPS deployment URL if you want admin-generated product QR codes to use a fixed public origin. The scanner's demo QR uses the current site URL automatically.
5. To verify against a real contract, add `BLOCKCHAIN_RPC_URL`, `CONTRACT_ADDRESS`, and `PRIVATE_KEY` as Vercel environment variables. Otherwise, the site reports demo-ledger verification.

The JSON store and uploaded files are written under `/tmp` on Vercel. That filesystem is temporary and isolated across serverless instances; changes, uploads, and user accounts are not durable. `MONGO_URI` currently only opens a Mongoose connection and does not make the JSON store persistent. Use a persistent database and object storage before relying on this deployment for real users or operational data.

For CLI deployment from a machine with Vercel access:
```bash
npx vercel login
npx vercel
npx vercel --prod
```

### 4. Smart Contract Compilation (Optional / Hardhat)
To compile and test the Solidity smart contract locally:
```bash
cd blockchain
npx hardhat compile
# Start local node if desired:
# npx hardhat node
# Deploy contract:
# npx hardhat run scripts/deploy.cjs --network localhost
```

---

## 12. REST API Specification

### Authentication (`/api/auth`)
- `POST /api/auth/register` – Register new user with role and verification token
- `POST /api/auth/login` – Authenticate user and issue JWT
- `GET /api/auth/verify-email/:token` – Verify email address
- `POST /api/auth/forgot-password` – Issue password reset token
- `POST /api/auth/reset-password` – Reset password using token
- `GET /api/auth/me` – Retrieve authenticated session profile

### Batches (`/api/batches`)
- `POST /api/batches` – Collector creates geo-tagged herb batch
- `GET /api/batches/my` – Retrieve batches created by authenticated harvester
- `GET /api/batches/:batchId` – Retrieve complete batch details

### Admin Supervision (`/api/admin`)
- `GET /api/admin/dashboard-stats` – 9 critical telemetry metrics
- `GET /api/admin/batches/pending` – List batches awaiting review
- `PUT /api/admin/batches/:batchId/approve` – Approve batch for processing
- `PUT /api/admin/batches/:batchId/reject` – Reject batch with required reason
- `POST /api/admin/processing` – Record cleaning, drying, grinding protocols
- `POST /api/admin/manufacturing` – Record commercial product formulations
- `POST /api/admin/lab-tests` – Record HPLC purity %, heavy metals, microbial assays
- `POST /api/admin/products` – Finalize product, mint on blockchain, generate QR
- `POST /api/admin/products/:productId/generate-qr` – Regenerate QR code

### Blockchain & Tampering (`/api/blockchain`)
- `POST /api/blockchain/register` – Mint deterministic hash to contract
- `GET /api/blockchain/:batchId/verify` – Compare database hash with on-chain ledger
- `POST /api/blockchain/simulate-tamper/:batchId` – Trigger Test Case 2 tampering
- `POST /api/blockchain/restore/:batchId` – Restore authentic state

### Customer & Verification (`/api/customer` / `/api/verify`)
- `GET /api/customer/products` – List verified products
- `GET /api/customer/dashboard-stats` – Customer metrics
- `GET /api/verify/:batchId` – Complete public verification dossier for QR scanning

### Complaints & Refunds (`/api/complaints`)
- `POST /api/complaints` – Customer files quality report
- `GET /api/complaints/my` – Customer's filed complaints
- `GET /api/complaints/admin/all` – Admin view of all tickets
- `PUT /api/admin/complaints/:id/respond` – Admin response
- `PUT /api/admin/complaints/:id/refund` – Admin issues demo refund (e.g. `REF-2026-001`)

### Botanical Chatbot (`/api/chatbot`)
- `POST /api/chatbot` – Grounded NLP query engine utilizing live batch records

---

## 13. Primary URLs & Routing Reference

- `/` – Landing Page & 6-Stage Process Pipeline
- `/login` – Universal Login with 1-Click Role Switcher
- `/register` – Multi-Role Registration with Email Verification Flow
- `/collector` – Harvester Dashboard with GPS Geolocation & Map Picker
- `/admin` – System Administrator Console & Quality Controls
- `/customer` – Consumer Trust Portal & Dispute Management
- `/scanner` – Optical Device Camera QR Code Scanner & Image Upload
- `/scanner` – Generates a deployment-specific demo QR and download using the current site URL
- `/verify/HERB-2026-001` – Flagship Verification Dossier (Ashwagandha)
- `/verify/HERB-2026-002` – Flagship Verification Dossier (Turmeric)
- `/complaint` – Quality Discrepancy & Packaging Defect Reporting
- `/demo-guide` – Step-by-Step Viva Presentation Guide for Test Cases 1, 2, and 3
