import { NextResponse } from "next/server";
import { setLoginData } from "@/lib/storage/secure-cookies";
import { LoginDTO } from "@/domain/auth/auth-types";
import { logService } from "@/helpers/log-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    logService("Received login data", { body });

    let loginData: LoginDTO;

    if (body.data && body.data.access_token) {
      loginData = body as LoginDTO;
    } else if (body.token) {
      loginData = {
        data: {
          access_token: body.token,
          expires_in: body.expires_in || 1800,
          refresh_expires_in: body.refresh_expires_in || 1800,
          refresh_token: body.refresh_token || body.token,
          token_type: body.token_type || "Bearer",
          scope: body.scope || "",
        },
      };
    } else if (body.access_token) {
      loginData = {
        data: {
          access_token: body.access_token,
          expires_in: body.expires_in || 1800,
          refresh_expires_in: body.refresh_expires_in || 1800,
          refresh_token: body.refresh_token || body.access_token,
          token_type: body.token_type || "Bearer",
          scope: body.scope || "",
        },
      };
    } else {
      logService("Invalid login data format", { body });
      return NextResponse.json(
        { success: false, error: "Invalid login data format" },
        { status: 400 }
      );
    }

    const { userRole } = await setLoginData(loginData);

    logService("Login data saved", { userRole });

    return NextResponse.json({
      success: true,
      userRole,
    });
  } catch (error) {
    logService("Error saving login data", { error });
    return NextResponse.json(
      { success: false, error: "Failed to save login data" },
      { status: 500 }
    );
  }
}
