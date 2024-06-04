import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../application/interfaces/service/IAuthService";
import { IAuctionInteractor } from "../../application/interfaces/auction/IAuctionInteractor";

export class AuctionController {
  private authService: IAuthService;
  private interactor: IAuctionInteractor;

  constructor(authService: IAuthService, interactor: IAuctionInteractor) {
    this.authService = authService;
    this.interactor = interactor;
  }

  async onGetAuction(req: Request, res: Response, next: NextFunction) {
    try {
      const auctions = await this.interactor.getAuction();
      return res.status(200).json({ success: true, auctions });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onAddAuction(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      console.log(token);

      if (!token) {
        throw new Error("user not authorised");
      }

      const { _id, role } = this.authService.verifyToken(token);

      if (role !== "auctioner" && role !== "admin") {
        throw new Error("user not authorised");
      }

      const body = req.body;

      const auction = await this.interactor.addAuction(_id.toString(), body);

      return res.status(200).json({
        success: true,
        message: "aucton added successfully",
        auction,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetOneAuction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;

      const auction = await this.interactor.getSingleAuctoin(id);

      return res.status(200).json({ success: true, auction });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onEditAuction(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("user not authorised");
      }

      const { _id, role } = this.authService.verifyToken(token);

      if (role !== "auctioner" && role !== "admin") {
        throw new Error("user not authorised");
      }
      const id = req.params.id;
      const body = req.body;

      const auction = await this.interactor.editAuction(id, body);

      return res.status(200).json({
        success: true,
        message: "auction edited successfully",
        auction,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onAuctionStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("user not authorised");
      }

      const { _id, role } = this.authService.verifyToken(token);

      if (role !== "auctioner" && role !== "admin") {
        throw new Error("user not authorised");
      }

      const { auctionId, status } = req.body;

      const auction = await this.interactor.changeAuctionStatus(
        auctionId,
        status
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
